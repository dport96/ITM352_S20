attributes  =  "Dan;52;52.5;-51.5";
var pieces = attributes.split(';');
for(i=0; i<pieces.length; i++) {
    console.log(pieces[i], typeof pieces[i]);
}
console.log(pieces.join('+'));