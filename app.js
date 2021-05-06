var app = new Vue({
	el: "#app",
	data: {
		product: "Mugs",
		image: "./assets/white-mug.jpg",
		link: "https://www.amazon.com/s?k=coffee+mugs&ref=nb_sb_noss_2",
		inStock: true,
		onSale: true,
		details: ["clay mineral", "quartz", "silica"],
		sizes: ["small", "medium", "large", "extra-large"],
		variants: [
			{
				variantId: 2234,
				variantColor: "white",
				variantImage: "./assets/white-mug.jpg",
			},
			{
				variantId: 2235,
				variantColor: "black",
				variantImage: "./assets/black-mug.jpg",
			},
		],
		cart: 0,
	},
	methods: {
		addToCart() {
			this.cart += 1;
		},
		removeFromCart() {
			this.cart -= 1;
		},
		updateProduct(variantImage) {
			this.image = variantImage;
		},
	},
});
