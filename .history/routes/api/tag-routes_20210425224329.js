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
        res.json({ "tags": tags })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }


});

router.get('/:id', async(req, res) => {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    try {
        const getSingleTag = await Tag.findAll({
            where: {
                id: req.params.id
            }
        });

        const tags = getSingleTag.map((product) =>
            product.get({ plain: true })
        );
        res.json({ "tags": tags })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async(req, res) => {
    // create a new tag
    ProductTag.create(req.body)
        .then((product_tag) => {
            // if there's product tags, we need to create pairings to bulk create in the ProductTag model
            if (req.body.tag_id.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product_tag.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            // if no product tags, just respond
            res.status(200).json(product_tag);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.put('/:id', async(req, res) => {
    // update a tag's name by its `id` value
    try {
        console.log(req.body)
        incomingRequestBody = req.body;
        const putTag = await ProductTag.findOne({
            where: { id: req.params.id }
        });
        if (incomingRequestBody["product_id"]) {
            putTag.product_id = incomingRequestBody.product_id;
        };
        if (incomingRequestBody["tag_id"]) {
            putTag.tag_id = incomingRequestBody.tag_id;
        };
        putTag.save();
        res.json({ "tags": putTag })
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }

});

router.delete('/:id', (req, res) => {
    // delete on tag by its `id` value
});

module.exports = router;