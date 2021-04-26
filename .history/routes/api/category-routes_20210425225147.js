const router = require('express').Router();
const { Category, Category } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    // be sure to include its associated Categorys
    try {
        const getAllCategories = await Category.findAll({
            include: [Category]

        });

        const Categories = getAllCategorys.map((Category) =>
            Category.get({ plain: true })
        );
        res.json({ "Categories": Categories })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Categorys
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