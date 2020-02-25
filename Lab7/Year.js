year = 2018;
switch ( year % 12) 
{
        case  0: 
             yearname = 'Monkey'; 
            break;
        case  1: 
             yearname = 'Rooster';
            break;
        case  2: 
             yearname = 'Dog';
            break;
        case  3: 
             yearname = 'Boar';
            break;
        case  4: 
             yearname = 'Rat';
            break;
        case  5: 
             yearname = 'Ox';
            break;
        case  6: 
             yearname = 'Tiger';
            break;
        case  7: 
             yearname = 'Rabbit';
            break;
        case  8: 
             yearname ='Dragon';
            break;
        case  9: 
             yearname = 'Snake';
            break;
        case 10: 
             yearname = 'Horse';
            break;
        case 11: 
             yearname = 'Lamb';
            break;
}
console.log( `Year  ${year} is a  ${yearname}`);
