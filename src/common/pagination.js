module.exports = (source = [], req) => {
    if(!req.pagination) throw new Error('400:pagination is not specified');
    const limit = req.pagination.limit? +req.pagination.limit: 2;
    const offset = req.pagination.offset? +req.pagination.offset: 0;
    const index = offset + limit;
    return source.slice(offset, index);
}