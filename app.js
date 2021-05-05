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
			},
			{
				variantId: 2235,
				variantColor: "black",
			},
		],
	},
});
