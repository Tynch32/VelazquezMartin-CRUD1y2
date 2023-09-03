const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render('products', {
			products,
			toThousand
		})
	},
	// Detail - Detail from one product
	detail: (req, res) => {
		const product = products.find(product => product.id === +req.params.id)
		return res.render('detail', {
			...product,
			toThousand
		})
	},
	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	// Create -  Method to store
	store: (req, res) => {
		const producto = req.body;
		let newProducts = {
			id: products[products.length - 1].id + 1,
			name: producto.name.trim(),
			price: +producto.price,
			discount: +producto.discount,
			category: producto.category,
			description: producto.description.trim(),
			image : null
		}
		newProducts.image=req.file.originalname;
		products.push(newProducts);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3), 'utf8');
		return res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		const product = products.find((product) => product.id === +req.params.id)
		return res.render('product-edit-form', {
			...product
		});
	},
	// Update - Method to update
	update: (req, res) => {
		const { name, price, discount, description, category, image } = req.body;
		const nombreDeLaImagen=req.file.originalname;
		const productModify = products.map(product => {
			if (product.id === +req.params.id) {
				product.name = name.trim();
				product.price = +price;
				product.discount = +discount;
				product.category = category;
				product.description = description.trim();
				product.image=nombreDeLaImagen;
			}
			return product
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 3), 'utf8');
		return res.redirect('/products');
	},
	// Delete - Delete one product from DB
	destroy: (req, res) => {
		const productsModify = products.filter(product => product.id != +req.params.id);
		fs.writeFileSync(productsFilePath, JSON.stringify(productsModify, null, 3), 'utf8');
		return res.redirect('/products');
	}
};

module.exports = controller;