const example = async (fastify, opts) => {
    fastify.get('/', async function (request, reply) {
        return 'this is an example';
    });
};
export default example;
//# sourceMappingURL=index.js.map