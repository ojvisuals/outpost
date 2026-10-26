// One source of truth for how each verification outcome is worded and styled.
// Colour is never the only signal: every status also has its own icon shape and label.

export const STATUS = {
  registered: {
    key: 'registered',
    label: 'Registered',
    tone: 'ok',
    icon: 'shieldCheck',
    headline: 'Matched to an active NAFDAC registration',
    body: 'This product was identified and its registration was confirmed in the available trusted records.',
    summary: 'We matched the product to an active NAFDAC registration.',
  },
  insufficient: {
    key: 'insufficient',
    label: 'Not enough information',
    tone: 'warn',
    icon: 'help',
    headline: 'We found this product identifier, but couldn’t confirm its NAFDAC registration.',
    body: 'This does not automatically mean the product is fake. We just don’t have enough information to confirm it either way.',
    summary: 'We found the product but couldn’t confirm its registration. That isn’t a sign it’s fake.',
  },
  not_verified: {
    key: 'not_verified',
    label: 'Not verified',
    tone: 'bad',
    icon: 'searchX',
    headline: 'We couldn’t find this product in the trusted registration records.',
    body: 'Not being verified does not mean a product is fake or counterfeit. Records can be incomplete or out of date.',
    summary: 'We couldn’t find it in the available records. That isn’t proof it’s fake either.',
  },
};

export const STATUS_ORDER = ['registered', 'insufficient', 'not_verified'];
