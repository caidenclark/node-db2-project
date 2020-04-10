
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.text('vin', 128).unique().notNullable();
      tbl.text('make', 128).notNullable();
      tbl.text('model', 128).notNullable();
      tbl.integer('mileage', 7).notNullable();
      tbl.text('transmission', 50);
      tbl.text('title_status', 20);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
};
