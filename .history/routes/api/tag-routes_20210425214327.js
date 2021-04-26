const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
    // find all tags
    // be sure to include its associated Product data
    try {
        const getAllTags = await ProductTag.findAll({});

        const tags = getAllTags.map((product) =>
            product.get({ plain: true })
        );
        res.json({ "tags ": tags })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }


});

router.get('/:id', (req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {
        const getSingleTag = await Product.findAll({
            where: {
                id: req.params.id
            }
        });

        const products = getSingleTag.map((product) =>
            product.get({ plain: true })
        );
        res.json({ "products": products })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
    // create a new tag
});

router.put('/:id', (req, res) => {
    // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
});

module.exports = router;