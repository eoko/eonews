Meteor.startup(function() {
  if(Things.find().count() === 0) {
    var things = [
      'Data on the Wire',
      'One Language',
      'Database Everywhere',
      'Latency Compensation',
      'Full Stack Reactivity',
      'Embrace the Ecosystem',
      'Simplicity Equals Productivity'
    ];
    things.forEach(function(thing) {
      var now = new Date();
      Things.insert({
        name: thing,
        name_sort: thing.toLowerCase(),
        createdAt: now,
        updatedAt: now
      });
    });
  }
});
