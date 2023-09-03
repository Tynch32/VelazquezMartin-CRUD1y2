const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		return res.render('index',{
			productsVisited : products.filter(product => product.category === "visited"),
			productsInSale : products.filter(product => product.category === "in-sale"),
			toThousand
		})
	},
	search: (req, res) => {
		const result = products.filter(products => product.name.tolowerCase().includes(req.query.keywords.toLowerCase()))
		return res.render('results',{
			result,
			toThousand,
			keywords : req.query.keywords
		})
	},
};

module.exports = controller;
