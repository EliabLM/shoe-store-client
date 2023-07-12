export const axiosErrorAdapter = (error) => {
  console.error('🚀 ~ axiosErrorAdapter ~ error:', error);
  const adapter = {
    statusCode: error.response.data?.statusCode || error.response.status || 400,
    message:
      error.response.data?.message ||
      error.response.statusText ||
      'Ha ocurrido un error, intente nuevamente.',
    data: null,
  };

  return adapter;
};
