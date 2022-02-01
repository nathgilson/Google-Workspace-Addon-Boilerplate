BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "🚀 Write 'prod' to deploy in production"
read prod

if [[ ! -z "$prod" ]] && [ $prod = "prod" ]; then
  echo "\n\n 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥"
  echo "\n 🔥 Deploying in production 🔥\n"
  echo " 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥 🔥\n\n"
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

firebase deploy --only functions

# send a notification when deploy is done
terminal-notifier -group 'MyApp' -title 'MyApp CloudFunctions' -message 'Finished' || echo "done"
say "Cloud functions deployed" -r 100 || echo "deployed"
