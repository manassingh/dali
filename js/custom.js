var catNames = ['Tom','Luccy','Pussy','Rug','Bill'];
var catsList=[];

for(var i=0;i<5;i++){
	var cat={};
	cat.name=catNames[i];
	cat.count=0;
	cat.index=i;
	var imgPath='img/cat' + (i+1) + '.jpg'
	cat.img=imgPath;
	catsList.push(cat);
}

var nameLable=document.getElementById('catName');
var countLable=document.getElementById('catCount');
var catImg=document.getElementById('catImg');

nameLable.innerHTML=catsList[0].name;
catImg.src=catsList[0].img;
catImg.id=catsList[0].index;
countLable.innerHTML=catsList[0].count;

var increaseCount = function(event){
	catsList[event.id].count++;
	countLable.innerHTML=catsList[event.id].count;
};

function makeCatList(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        //add click event listner
        item.addEventListener('click',(function(num){
        	return function() {
		        nameLable.innerHTML=catsList[num].name;
		        catImg.src=catsList[num].img;
		        catImg.id=catsList[num].index;
		        countLable.innerHTML=catsList[num].count;
		    };
        })(i),false);

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

// Add the contents of options[0] to #foo:
document.getElementById('catList').appendChild(makeCatList(catNames));