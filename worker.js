export default {
  async fetch(request, env, ctx) {
    return new Response("Tanay Status Monitor is running.", {
      status: 200,
    });
  },

  async scheduled(event, env, ctx) {
    const start = Date.now();

    try {
      const response = await fetch("https://tanaygupta.com", {
        method: "GET",
      });

      const responseTime = Date.now() - start;

      const result = {
        service: "portfolio",
        status: response.status,
        responseTime,
        operational: response.ok,
        checkedAt: new Date().toISOString(),
      };

      await env.KV.put("portfolio", JSON.stringify(result));

      console.log(JSON.stringify(result));

    } catch (error) {
      const result = {
        service: "portfolio",
        operational: false,
        error: error.message,
        checkedAt: new Date().toISOString(),
      };

      await env.KV.put("portfolio", JSON.stringify(result));

      console.log(JSON.stringify(result));
    }
  },
};
