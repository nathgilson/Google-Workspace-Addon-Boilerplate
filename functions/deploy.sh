BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [[ "$BRANCH" = "master" ]]
then

    if [ -n "$(git status --porcelain)" ]; then
        echo "\n❗️ Please commit your changes before deploying❗️\n";
        exit 1 # terminate and indicate error
    fi

    echo "🚀 Write 'prod' to deploy in production"
    read prod

    if [[ ! -z "$prod" ]] && [ $prod = "prod" ]
    then
        echo "\n\n 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥"
        echo "\n 🔥 Deploying in production 🔥\n"
        echo " 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥\n\n"

        say "deploying Cloud functions in production" -r 400 || echo "deploying in production"

        firebase use --add MyApp
        yarn run build

        # create a release tag and push it
        version=$(date '+cloudFunctions--%Y/%m/%d--%H.%M.%S')
        git tag -a $version -m "Cloud functions Production release version $version"
        echo "Release tagged $version"
        git push --tags
    else
        echo "Please enter prod to deploy in production"
        exit 1 # terminate and indicate error
    fi
else
    echo "\n❗️ Branch must be master to deploy in production ❗️"
    exit 1 # terminate and indicate error
fi

firebase deploy --only functions

# send a notification when deploy is done
terminal-notifier -group 'MyApp' -title 'MyApp CloudFunctions' -message 'Finished' || echo "done"
say "Cloud functions deployed" -r 400 || echo "deployed"