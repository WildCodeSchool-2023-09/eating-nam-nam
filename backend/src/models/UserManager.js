const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const defaultAvatar = "public/assets/usersAvatars/defaultavatar.png";
    const [result] = await this.database.query(
      `insert into ${this.table} (username, email, password, avatar) values (?, ?, ?,?)`,
      [user.username, user.email, user.password, defaultAvatar]
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readByUsername(username) {
    // Execute the SQL SELECT query to retrieve a specific user by its Username
    const [rows] = await this.database.query(
      `select * from ${this.table} where username = ?`,
      [username]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific user by its Username
    const [rows] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );

    // Return the first row of the result, which represents the user
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of users
    return rows;
  }

  // The U of CRUD - Update operation
  async update(user, avatar) {
    // Execute the SQL SELECT query to retrieve a specific user by its Username
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, birthdate = ?, description = ?, avatar = ?
WHERE user.id = ?`,
      [
        user.firstname,
        user.lastname,
        user.birthdate,
        user.description,
        avatar,
        user.id,
      ]
    );

    // Return the first row of the result, which represents the user
    return result;
  }

  // async update(user) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an user by its ID

  // async delete(id) {
  //   ...
  // }
}

module.exports = UserManager;
