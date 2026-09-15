export default {
  async scheduled(event, env, ctx) {
    const start = Date.now();

    try {
      const response = await fetch("https://tanaygupta.com", {
        method: "GET",
      });

      const responseTime = Date.now() - start;

      console.log(JSON.stringify({
        service: "portfolio",
        status: response.status,
        responseTime: responseTime,
        operational: response.ok,
        checkedAt: new Date().toISOString(),
      }));

    } catch (error) {
      console.log(JSON.stringify({
        service: "portfolio",
        operational: false,
        error: error.message,
        checkedAt: new Date().toISOString(),
      }));
    }
  },
};
