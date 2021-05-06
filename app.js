var app = new Vue({
	el: "#app",
	data: {
		product: "Mugs",
		image: "./assets/turquoise-mug.jpg",
		link: "https://www.amazon.com/s?k=coffee+mugs&ref=nb_sb_noss_2",
		inStock: false,
		onSale: true,
		details: ["clay mineral", "quartz", "silica"],
		sizes: ["small", "medium", "large", "extra-large"],
		variants: [
			{
				variantId: 2234,
				variantColor: "turquoise",
				variantImage: "./assets/turquoise-mug.jpg",
			},
			{
				variantId: 2235,
				variantColor: "pink",
				variantImage: "./assets/pink-mug.jpg",
			},
			{
				variantId: 2236,
				variantColor: "yellow",
				variantImage: "./assets/yellow-mug.jpg",
			},
		],
		cart: 0,
	},
	methods: {
		addToCart() {
			this.cart += 1;
		},
		// removeFromCart() {
		// 	this.cart -= 1;
		// },
		updateProduct(variantImage) {
			this.image = variantImage;
		},
	},
});
