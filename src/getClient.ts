export const send = <T>(to: string, json: T) =>
  fetch(`http://localhost:${import.meta.env.PORT || 4000}/${to}?batch=1`, {
    method: "post",
    body: JSON.stringify({
      0: {
        json,
      },
    }),
  });
