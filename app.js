var app = new Vue({
	el: "#app",
	data: {
		product: "Mugs",
		brand: "Vue Mastery",
		selectedVariant: 0,
		link: "https://www.amazon.com/s?k=coffee+mugs&ref=nb_sb_noss_2",
		onSale: true,
		details: ["clay mineral", "quartz", "silica"],
		sizes: ["small", "medium", "large", "extra-large"],
		variants: [
			{
				variantId: 2234,
				variantColor: "turquoise",
				variantImage: "./assets/turquoise-mug.jpg",
				variantQuantity: 10,
			},
			{
				variantId: 2235,
				variantColor: "pink",
				variantImage: "./assets/pink-mug.jpg",
				variantQuantity: 0,
			},
			{
				variantId: 2236,
				variantColor: "yellow",
				variantImage: "./assets/yellow-mug.jpg",
				variantQuantity: 5,
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
		updateProduct(index) {
			this.selectedVariant = index;
			console.log(index);
		},
	},
	computed: {
		title() {
			return this.brand + " " + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].variantImage;
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity;
		},
	},
});
