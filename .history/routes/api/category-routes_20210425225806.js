const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
    // find all categories
    // be sure to include its associated Products
    try {
        const getAllCategories = await Category.findAll({


        });

        const categories = getAllCategories.map((product) =>
            product.get({ plain: true })
        );
        res.json({ "categories": categories })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async(req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
        const getAllCategories = await Category.findAll({
            where: {
                id: req.params.id
            }
        });
        const categories = getAllCategories.map((product) =>
            product.get({ plain: true })
        );
        res.json({ "categories": categories });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
    // create a new category
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
});

module.exports = router;