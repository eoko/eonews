
if (Meteor.settings.facebook) {
  ServiceConfiguration.configurations.upsert({
    service: 'facebook'
  }, {
    $set: {
      appId: Meteor.settings.facebook.appId,
      secret: Meteor.settings.facebook.secret
    }
  });
}

if (Meteor.settings.github) {
  ServiceConfiguration.configurations.upsert({
    service: 'github'
  }, {
    $set: {
      clientId: Meteor.settings.github.clientId,
      secret: Meteor.settings.github.secret
    }
  });
}
