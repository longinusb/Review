axios("http://www.kaifa.com/data", {
  method: "GET",
  timeout: 3000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
}).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    if (err.response.status === 401) {
    }
    if (err.response.status === 403) {
    }
  }
);
