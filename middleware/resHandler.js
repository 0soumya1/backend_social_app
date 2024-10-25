const resHandler = (res, code, isSuccess, msg, data) => {
  return res.status(code).send({
    success: isSuccess,
    message: msg ? msg : "no msg",
    data: data ? data : "",
  });
};

module.exports = resHandler;
