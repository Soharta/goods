(function() {

    var basket = (function() {
    var goodsInBasket = [];

    var markupGenerationBasket = function() {
      var basketWrapp = document.createElement('div');
      basketWrapp.classList.add('basketWrapp');
      var basketAllCoast = document.createElement('div');
      var basketHead = document.createElement('div');
      basketHead.innerHTML = 'Сумма товаров в корзине: ';
      basketAllCoast.classList.add('basketAllCoast');
      basketWrapp.appendChild(basketHead);
      basketWrapp.appendChild(basketAllCoast);

      return basketWrapp;
    };

    document.body.appendChild( markupGenerationBasket() );

    return {
      costAllGoodsInBasket : function() {
        var result = goodsInBasket.reduce(function(sum, currentValue) {
          return sum + currentValue.price;
        }, 0);
        return result;
      },
      addGoodsToBasket : function(newGoods) {
        goodsInBasket.push(newGoods);
      },
      getGoodsInBasket : function() {
        return goodsInBasket;
      },
      showCoastInBasket : function() {       
        var basketField = document.getElementsByClassName('basketAllCoast')[0];
        basketField.innerHTML = this.costAllGoodsInBasket();
      },
      showGoodsInBasket : function( goods ) {
        var nameGoods = document.createElement('div');
        nameGoods.classList.add('goodsInBasket');
        nameGoods.innerHTML = goods.nameGoods;
        document.getElementsByClassName('basketWrapp')[0].appendChild(nameGoods);
      }
    };
  })();

  function Goods (options) {
    this.elem = options;
    this.init();
  };
  Goods.prototype.init = function() {
    this.srcImage = this.elem.srcImage;
    this.nameGoods = this.elem.nameGoods;
    this.price = this.elem.price;
    this.discount = this.elem.discount;
    this.descr = this.elem.descr;
    
    this.goodsItem = this.markupGeneration();
    document.body.insertBefore(this.goodsItem, document.getElementsByClassName('basketWrapp')[0]);
 	  this.goodsItem.onclick = this.addGoods.bind(this);
  };
  Goods.prototype.markupGeneration = function() {
  	this.wrapp = document.createElement('div');
    this.wrapp.classList.add('goodsItem');
    this.imageGoods = document.createElement('img');
    this.imageGoods.src =  this.srcImage;
    this.wrapp.appendChild(this.imageGoods);
    this.wrapp.innerHTML += '<div>'+ this.nameGoods +'</div>';
    this.wrapp.innerHTML += '<div>'+ this.price +' руб.</div>';
    this.wrapp.innerHTML += '<div>'+ this.discount +'</div>';
    this.wrapp.innerHTML += '<div>'+ this.descr +'</div>';
    this.wrapp.innerHTML += '<button type="button"> В корзину </button>';

    return this.wrapp;
  };
  Goods.prototype.addGoods = function(e) {
    if( e.target.tagName != 'BUTTON') return;
    basket.addGoodsToBasket( this );
    // basket.costAllGoodsInBasket();
    basket.showCoastInBasket();
    basket.showGoodsInBasket( this );
  }

  var options01 = {
    srcImage : 'image01.jpg',
    nameGoods : 'Матрешка',
    price : 38,
    discount : '',
    descr : ' "Это самая клевая матрешка'
  };
  var goods01 = new Goods( options01 );

  var options02 = {
    srcImage : 'image02.jpg',
    nameGoods : 'Мёдвед',
    price : 52,
    discount : '',
    descr : ' "Этот знает где мед'
  };
  var goods02 = new Goods( options02 );

  var options03 = {
    srcImage : 'image03.jpg',
    nameGoods : 'Жаба',
    price : 13,
    discount : '',
    descr : ' "Умеет квакать и душить'
  };
  var goods03 = new Goods( options03 );
})();