function apiResult(data, status, message) {
  return { data, status, message };
}

function apiError(msg) {
  return { status: "error", message: msg };
}

function apiSuccess(data) {
  return { status: "success", data: data };
}

module.exports = {
  apiResult,
  apiSuccess,
  apiError,
};
