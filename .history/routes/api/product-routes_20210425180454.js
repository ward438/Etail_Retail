const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async(req, res) => {
    try {
        const getAllProducts = await Product.findAll({
            include: [Category]

        });

        const products = getAllProducts.map((product) =>
            product.get({ plain: true })
        );
        res.json({ "products": products })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get one product
router.get('/:id', async(req, res) => {
    try {
        const getSingleProduct = await Product.findAll({
            where: {
                id: req.params.id
            }
        });

        const products = getSingleProduct.map((product) =>
            product.get({ plain: true })
        );
        res.json({ "products": products })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// create new product
router.post('/', async(req, res) => {

    Product.create(req.body)
        .then((product) => {
            // if there's product tags, we need to create pairings to bulk create in the ProductTag model
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            // if no product tags, just respond
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
});

// update product
router.put('/:id', async(req, res) => {
    try {
        incomingRequestBody = req.body.products[0];
        const putProduct = await Product.findOne({
            where: { id: req.params.id }
        });

        if (incomingRequestBody[price] !== null) {
            putProduct.price = incomingRequestBody.price;
        }
        putProduct.save();

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }

});





router.delete('/:id', async(req, res) => {
    try {
        const deleteProduct = await Product.destroy({
            // include: [Category]
            where: { id: req.params.id }
        });

        res.json({ "products": products })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;