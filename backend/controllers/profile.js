const db = require("../database/db");
const Connection = require("../database/db");
const getAllInformation = (req, res) => {
  const userId = req.params.userId;
  const query = `select Username ,email,Phone_number,profileImg from user where id=${userId}`;
  Connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(404)
        .json({ success: false, message: "no results where found", err });
    } else {
      console.log(result);
      res.status(200).json({
        success: true,
        message: "All information for user ",
        result: result,
      });
    }
  });
};
const editProfile = (req, res) => {};

module.exports = { getAllInformation, editProfile };
//done
