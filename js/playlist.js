/**
 * Created by Ameya on 7/29/2016.
 */

var playlistInstance = function(collection){
    return (function(){
        //Everything outside of the public Method is private
        var items, currentItemIndex, itemsLength;

        var publicMethods = {
            init: function(collection) {
                items = JSON.parse(collection);
                itemsLength = Object.keys(items).length;
            },
            getItems: function() {
                return items;
            },
            getItemsLength: function() {
                return itemsLength;
            },
            getCurrentItemIndex: function() {
                return currentItemIndex;
            },
            setCurrentItemIndex: function(index) {
                currentItemIndex = parseInt(index);
            }

        };

        if(collection && collection != undefined){
            publicMethods.init(collection);
        }

        return publicMethods;
    })(collection);
};
