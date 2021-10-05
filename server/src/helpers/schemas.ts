export const email = {
  type: "string",
  pattern: "^(?:[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$",
} as const

export const ulid = {
  type: "string",
  pattern: "^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$",
} as const

export const statusSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
  required: ["message"],
  additionalProperties: false,
} as const

export const accessTokenSchema = {
  type: "object",
  properties: {
    accessToken: { type: "string" },
    expiresAt: { type: "integer" },
  },
  required: ["accessToken", "expiresAt"],
  additionalProperties: false,
} as const

export const idAndAccessTokenSchema = {
  type: "object",
  properties: {
    idToken: { type: "string" },
    accessToken: { type: "string" },
  },
  required: ["idToken", "accessToken"],
  additionalProperties: false,
} as const

export const profileSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    groups: { type: "array", items: { type: "string" } },
    issuedAt: { type: "integer" },
    expiresAt: { type: "integer" },
  },
  required: ["email", "groups", "issuedAt", "expiresAt"],
  additionalProperties: false,
} as const

export const fundraiserEditsSchema = {
  type: "object",
  properties: {
    fundraiserName: { type: "string", minLength: 1, maxLength: 128 },
    activeFrom: { type: "number" },
    activeTo: { type: ["number", "null"] },
    paused: { type: "boolean" },
    goal: { type: "integer", exclusiveMinimum: 0 },
    totalRaised: { type: "integer", minimum: 0 },
    donationsCount: { type: "integer", minimum: 0 },
    matchFundingRate: { type: "integer", minimum: 0 },
    matchFundingPerDonationLimit: { type: ["integer", "null"], exclusiveMinimum: 0 },
    matchFundingRemaining: { type: ["integer", "null"], minimum: 0 },
    minimumDonationAmount: { type: ["integer", "null"], exclusiveMinimum: 0 },
    groupsWithAccess: { type: "array", items: { type: "string" } },
  },
  minProperties: 1,
  additionalProperties: false,
} as const

export const fundraiserSchema = {
  type: "object",
  properties: {
    id: ulid,
    ...fundraiserEditsSchema.properties,
  },
  required: ["id", "fundraiserName", "activeFrom", "activeTo", "paused", "goal", "totalRaised", "donationsCount", "matchFundingRate", "matchFundingPerDonationLimit", "matchFundingRemaining", "minimumDonationAmount", "groupsWithAccess"],
  additionalProperties: false,
} as const

export const fundraisersSchema = { type: "array", items: fundraiserSchema } as const

export const donationEditsSchema = {
  type: "object",
  properties: {
    fundraiserId: ulid,
    donorName: { type: "string" },
    donorEmail: email,
    createdAt: { type: "integer" },
    address: { type: ["string", "null"] },
    giftAid: { type: "boolean" },
    comment: { type: ["string", "null"] },
    donationAmount: { type: "number", minimum: 0 },
    matchFundingAmount: { type: "integer", minimum: 0 },
    contributionAmount: { type: "integer", minimum: 0 },
    payments: { type: "array", items: { type: "object", properties: { at: { type: "integer" }, amount: { type: "integer" } }, required: ["at", "amount"] } },
    paymentMethod: { enum: ["card", "cash", "direct_to_charity"] },
    paymentGatewayId: { type: ["string", "null"] },
    charity: { type: "string" },
    overallPublic: { type: "boolean" },
    namePublic: { type: "boolean" },
    commentPublic: { type: "boolean" },
    donationAmountPublic: { type: "boolean" },
  },
  additionalProperties: false,
} as const

export const donationSchema = {
  type: "object",
  properties: {
    id: ulid,
    ...donationEditsSchema.properties,
  },
  required: ["id", "fundraiserId", "donorName", "donorEmail", "createdAt", "address", "giftAid", "comment", "donationAmount", "matchFundingAmount", "contributionAmount", "payments", "paymentMethod", "paymentGatewayId", "charity", "overallPublic", "namePublic", "commentPublic", "donationAmountPublic"],
  additionalProperties: false,
} as const

export const donationsSchema = { type: "array", items: donationSchema } as const
