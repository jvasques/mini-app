module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root@localhost',
  database: 'crudvue',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
