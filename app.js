Vue.component("product", {
	template: `
  <div class="product">
				<div class="product">
					<div class="product-image">
						<img :src="image" />
					</div>

					<div class="product-info">
						<h1>{{ title }}</h1>
						<a :href="link" target="_blank">More products like this</a>
						<p v-if="inStock">In Stock</p>
               <p>Shipping: {{ shipping }}</p>
						<p v-else :disabled="!inStock" :class="{outOfStock: !inStock}">Out of Stock</p>
						<p>{{sale}}</p>

						<ul>
							<li v-for="detail in details">{{detail}}</li>
						</ul>

						<!-- <ul>
							<li v-for="size in sizes">{{size}}</li>
						</ul> -->

						<div
							class="color-box"
							v-for="(variant, index) in variants"
							:key="variant.variantId"
							:style="{backgroundColor: variant.variantColor}"
							@mouseover="updateProduct(index)"
						></div>

						<button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to cart</button>
						<!-- <button v-on:click="removeFromCart">Remove from cart</button> -->

					</div>
				</div>
			</div>
  </div>
  `,
	props: {
		premium: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			product: "Mugs",
			brand: "Vue Mastery",
			selectedVariant: 0,
			link: "https://www.amazon.com/s?k=coffee+mugs&ref=nb_sb_noss_2",
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
			cart: [],
			onSale: true,
		};
	},
	methods: {
		addToCart() {
			this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
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
		sale() {
			if (this.onSale) {
				return this.brand + " " + this.product + " are on sale!";
			}
			return this.brand + " " + this.product + " are not on sale!";
		},
		shipping() {
			if (this.premium) {
				return "Free";
			} else {
			}
			return 2.99 + " USD";
		},
	},
});

var app = new Vue({
	el: "#app",
	data: {
		premium: true,
		cart: [],
	},
	methods: {
		updateCart(id) {
			this.cart.push(id);
		},
	},
});
