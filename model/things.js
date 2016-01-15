Things = new Mongo.Collection('things');

Things.allow({
  insert: function(userId, thing) {
    thing.createdAt = new Date();
    thing.updatedAt = this.createdAt;
    thing.name_sort = thing.name.toLowerCase();
    return true;
  },
  update: function(userId, thing, fields, modifier) {
    thing.updatedAt = new Date();
    thing.name_sort = thing.name.toLowerCase();
    return true;
  },
  remove: function(userId, thing) {
    return true;
  }
});
