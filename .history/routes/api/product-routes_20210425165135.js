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
            // include: [Category]
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
router.post('/', (req, res) => {

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
router.put('/:id', (req, res) => {
    // update product data
    Product.update(req.body, {
            where: {
                id: req.params.id,
            },
        })
        .then((product) => {
            // find all associated tags from ProductTag
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })
        .then((productTags) => {
            // get list of current tag_ids
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            // create filtered list of new tag_ids
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });
            // figure out which ones to remove
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            // run both actions
            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.json(updatedProductTags))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});

router.delete('/:id', async(req, res) => {
    try {
        const deleteProduct = await Product.destroy({
            // include: [Category]
            where: { id }

        });

        const products = deleteProduct.map((product) =>
            product.get({ plain: true })
        );
        res.json({ "products": products })
            // res.render('homepage', {
            //   products,
            //   loggedIn: req.session.loggedIn,
            // });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;