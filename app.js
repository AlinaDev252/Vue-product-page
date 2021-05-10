var eventBus = new Vue();

Vue.component("product", {
	template: `
       <div class="product">
          
        <div class="product-image">
          <img :src="image" />
        </div>
  
        <div class="product-info">
            <h1>{{ product }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
  
            <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>
  
            <div class="color-box"
                 v-for="(variant, index) in variants" 
                 :key="variant.variantId"
                 :style="{ backgroundColor: variant.variantColor }"
                 @mouseover="updateProduct(index)"
                 >
            </div> 
  
            <button v-on:click="addToCart" 
              :disabled="!inStock"
              :class="{ disabledButton: !inStock }"
              >
            Add to cart
            </button>

         <product-tabs :reviews="reviews"></product-tabs>
      
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
			// onSale: true,
			reviews: [],
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
		// sale() {
		// 	if (this.onSale) {
		// 		return this.brand + " " + this.product + " are on sale!";
		// 	}
		// 	return this.brand + " " + this.product + " are not on sale!";
		// },
		shipping() {
			if (this.premium) {
				return "Free";
			} else {
			}
			return 2.99 + " USD";
		},
	},
	mounted() {
		eventBus.$on("review-submitted", (productReview) => {
			this.reviews.push(productReview);
		});
	},
});

Vue.component("product-review", {
	template: `
  <form class="review-form" @submit.prevent="onSubmit">
      <p class="error" v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
  `,
	data() {
		return {
			name: null,
			review: null,
			rating: null,
			errors: [],
		};
	},
	methods: {
		onSubmit() {
			this.errors = [];
			if (this.name && this.review && this.rating) {
				let productReview = {
					name: this.name,
					review: this.review,
					rating: this.rating,
				};
				eventBus.$emit("review-submitted", productReview);
				this.name = null;
				this.review = null;
				this.rating = null;
			} else {
				if (!this.name) this.errors.push("Name required.");
				if (!this.review) this.errors.push("Review required.");
				if (!this.rating) this.errors.push("Rating required.");
			}
		},
	},
});

Vue.component("product-tabs", {
	template: `
    <div>
      <div>
        <span class="tabs"
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs"
              :key="index"
              @click="selectedTab = tab"
            >{{ tab }}</span>
      <div>

    <div v-show="selectedTab === 'Reviews'">
      <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
          <li v-for="(review, index) in reviews" :key="index">
              <p>{{ review.name }}</p>
              <p>Rating:{{ review.rating }}</p>
              <p>{{ review.review }}</p>
          </li>
        </ul>
    </div>

    <div v-show="selectedTab === 'Make a Review'">
          <product-review></product-review>
    </div>
  </div>
  `,
	props: {
		reviews: {
			type: Array,
			required: false,
		},
	},
	data() {
		return {
			tabs: ["Reviews", "Make a Review"],
			selectedTab: "Reviews",
		};
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
