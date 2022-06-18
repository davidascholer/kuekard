//Custom palettes
const colors = {
    "aero": {
        dark: '#7880B5',
        medDark: '#6987C9',
        medium: '#6BBAEC',
        medLight: '#BCC4DB',
        light: '#C0A9B0'
    },
    "almond coffee": {
        dark: '#727D71',
        medDark: '#6D4C3D',
        medium: '#A39171',
        medLight: '#DCC9B6',
        light: '#ABC4AB'
    },
    "bear": {
        dark: '#150704',
        medDark: '#4B1309',
        medium: '#906F50',
        medLight: '#B97344',
        light: '#E7C3A9'
    },
    "burnt": {
        dark: '#220901',
        medDark: '#621708',
        medium: '#941b0c',
        medLight: '#bc3908',
        light: '#f6aa1c'
    },
    "cadet": {
        dark: '#253237',
        medDark: '#5C6B73',
        medium: '#9DB4C0',
        medLight: '#C2DFE3',
        light: '#E0FBFC'
    },
    "cerise": {
        dark: '#5E4352',
        medDark: '#BE3E82',
        medium: '#E43F6F',
        medLight: '#F56476',
        light: '#DFBBB1'
    },
    "kuekard classic": {
        dark: '#1b1b1e',
        medDark: '#373f51',
        medium: '#58a4b0',
        medLight: '#a9bcd0',
        light: '#d8dbe2'
    },
    "dusk": {
        dark: '#2d3142',
        medDark: '#4f5d75',
        medium: '#676E9D',
        medLight: '#bfc0c0',
        light: '#E4E4E4'
    },
    "forest": {
        dark: '#163409',
        medDark: '#316519',
        medium: '#4D992D',
        medLight: '#69CB3C',
        light: '#7FF24E'
    },
    "fox": {
        dark: '#36372F',
        medDark: '#6B391B',
        medium: '#606353',
        medLight: '#605545',
        light: '#897E74'
    },
    "greyscale": {
        dark: '#111111',
        medDark: '#333333',
        medium: '#555555',
        medLight: '#777777',
        light: '#999999'
    },
    "honey": {
        dark: '#814617',
        medDark: '#B66C24',
        medium: '#E5AF2F',
        medLight: '#FACE43',
        light: '#FCDC63'
    },
    "lavender": {
        dark: '#1B1F3B',
        medDark: '#813EB8',
        medium: '#B14AED',
        medLight: '#C874D9',
        light: '#E1BBC9'
    },
    "mint": {
        dark: '#0A3A2A',
        medDark: '#137A63',
        medium: '#5AA17F',
        medLight: '#81B69D',
        light: '#92DDC8'
    },
    "mountain flower": {
        dark: '#0E1116',
        medDark: '#374A67',
        medium: '#616283',
        medLight: '#9E7B9B',
        light: '#CB9CF2'
    },
    "northwest": {
        dark: '#1d4e89',
        medDark: '#388659',
        medium: '#3aaed8',
        medLight: '#2bd9fe',
        light: '#52aa5e'
    },
    "olive": {
        dark: '#7C7C7C',
        medDark: '#7F8F85',
        medium: '#ACBCB2',
        medLight: '#C6D4C5',
        light: '#DDEAD9'
    },
    "orchid": {
        dark: '#63458A',
        medDark: '#9A48D0',
        medium: '#7E5A9B',
        medLight: '#B288C0',
        light: '#E4B7E5'
    },
    "oxford sapphire": {
        dark: '#00072D',
        medDark: '#001C55',
        medium: '#0E6BA8',
        medLight: '#42AAF0',
        light: '#A6E1FA'
    },
    "pacific reef": {
        dark: '#19647e',
        medDark: '#2f97c1',
        medium: '#28afb0',
        medLight: '#23b5d3',
        light: '#98c1d9'
    },
    "pumpkin": {
        dark: '#ff4800',
        medDark: '#ff6000',
        medium: '#ED7133',
        medLight: '#ff9e00',
        light: '#ffb600'
    },
    "scarlet": {
        dark: '#EA5556',
        medDark: '#641220',
        medium: '#A25751',
        medLight: '#E93F33',
        light: '#ECA5A5'
    },
    "sienna ruby": {
        dark: '#0B0033',
        medDark: '#370031',
        medium: '#832232',
        medLight: '#CE8964',
        light: '#EAF27C'
    },
    "slate green": {
        dark: '#35524A',
        medDark: '#627C85',
        medium: '#779CAB',
        medLight: '#32DE8A',
        light: '#A2E8DD'
    },
    "spring frost": {
        dark: '#157145',
        medDark: '#57A773',
        medium: '#6A8EAE',
        medLight: '#9BD1E5',
        light: '#D1FAFF'
    },
    "steel blue": {
        dark: '#16425b',
        medDark: '#2f6690',
        medium: '#3a7ca5',
        medLight: '#81c3d7',
        light: '#d9dcd6'
    },
    "tyrian": {
        dark: '#3C1B43',
        medDark: '#501537',
        medium: '#922D50',
        medLight: '#B8C480',
        light: '#D4E79E'
    }
}

const contrast = {
    1: '#f8fbfc',
    2: '#eaf4f5',
    3: '#ddedef',
    4: '#d0e5e9',
    5: '#c3dee2',
    6: '#b5d7dc',
    7: '#a8d0d6',
    8: '#9bc8cf',
    9: '#8dc1c9',
    10: '#80bac3',
    11: '#73b3bd',
    12: '#65abb6',
    13: '#58a4b0',//default
    14: '#4e9aa6',
    15: '#488e99',
    16: '#42818b',
    17: '#3c757e',
    18: '#356971',
    19: '#2f5c63',
    20: '#295056',
    21: '#224349',
    22: '#224349',
    23: '#162b2e',
    24: '#0f1e21',
    25: '#091213',
    26: '#030606',
}
const lightGrey = 'C0C3C8';
const lightBlue = 'C1E7FD';
const offWhite = 'F2F2F2';
const steel = '58a4b0';
// export const colors = colors;
export const shades = contrast;
export const allColors = colors;

