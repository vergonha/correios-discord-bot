export interface iShopeeResponse {
  error: number
  error_msg: string
  data: Data
}

export interface Data {
  status: Status
  pc_shipping: PcShipping
  address: Address
  guarantee: Guarantee
  info_card: InfoCard
  payment_method: PaymentMethod
  coins: Coins
  pc_processing_info: PcProcessingInfo
  secondary_buttons: SecondaryButton[]
  primary_buttons: PrimaryButton[]
  components: number[]
  list_type: number
  notification_bar: NotificationBar
}

export interface Status {
  status_label: StatusLabel
  header_text: HeaderText
  header_image: string
  popup_msg: PopupMsg
  list_view_text: ListViewText
  list_view_status_label: ListViewStatusLabel
}

export interface StatusLabel {
  text: string
  tl: boolean
}

export interface HeaderText {
  text: string
  tl: boolean
  attributes: Attribute[]
}

export interface Attribute {
  name: string
  value: string
  type: number
}

export interface PopupMsg {
  text: string
  tl: boolean
}

export interface ListViewText {
  text: string
  tl: boolean
  attributes: Attribute2[]
}

export interface Attribute2 {
  name: string
  value: string
  type: number
}

export interface ListViewStatusLabel {
  text: string
  tl: boolean
}

export interface PcShipping {
  forder_shipping_info_list: ForderShippingInfoList[]
  is_multi_parcel: boolean
  num_parcels: number
  can_modify_fulfilment_channel: boolean
  fulfilment_carrier_channel_id: number
  fulfilment_carrier: FulfilmentCarrier2
  disable_edit_fulfilment_channel_reason: string
  use_standard_proof: boolean
  fulfilment_channel_updatability: number
}

export interface ForderShippingInfoList {
  parcel_no: number
  tracking_number: string
  tracking_info_list: TrackingInfoList[]
  fulfilment_carrier_channel_id: number
  fulfilment_carrier: FulfilmentCarrier
  live_tracking_link: string
  shipping_otp_info: ShippingOtpInfo
}

export interface TrackingInfoList {
  driver_phone: string
  driver_name: string
  ctime: number
  description: string
  license_plate_number: string
  receiver_name: string
  pin_code: string
  have_std_epod: boolean
  milestone?: Milestone
  epod?: string
}

export interface Milestone {
  image_url: string
  text: string
  color: number
}

export interface FulfilmentCarrier {
  text: string
  tl: boolean
}

export interface ShippingOtpInfo {
  otp_code: string
}

export interface FulfilmentCarrier2 {
  text: string
  tl: boolean
}

export interface Address {
  shipping_name: string
  shipping_phone: string
  shipping_address: string
  is_buyer_address_editable: boolean
}

export interface Guarantee {
  instruction_text: InstructionText
  popup: Popup
  learn_more_url: string
  is_extend_enabled: boolean
}

export interface InstructionText {
  text: string
  tl: boolean
  attributes: Attribute3[]
}

export interface Attribute3 {
  name: string
  value: string
  type: number
}

export interface Popup {
  title: Title
  msg: Msg
  type: number
}

export interface Title {
  text: string
  tl: boolean
}

export interface Msg {
  text: string
  tl: boolean
  attributes: Attribute4[]
}

export interface Attribute4 {
  name: string
  value: string
  type: number
}

export interface InfoCard {
  parcel_cards: ParcelCard[]
  is_multi_parcel: boolean
  subtotal: number
  final_total: number
  vat_amount: number
  amount_paid: number
}

export interface ParcelCard {
  parcel_no: number
  forder_id: string
  parcel_status_info: ParcelStatusInfo
  shop_info: ShopInfo
  product_info: ProductInfo
  payment_info: PaymentInfo
  logistics_id: string
}

export interface ParcelStatusInfo {
  label: Label
  tooltip: Tooltip
  status: number
}

export interface Label {
  text: string
  tl: boolean
}

export interface Tooltip {
  text: string
  tl: boolean
}

export interface ShopInfo {
  shop_id: number
  shop_name: string
  user_id: number
  username: string
  portrait: string
  shop_tag: number
}

export interface ProductInfo {
  item_groups: ItemGroup[]
  total_num_items: number
}

export interface ItemGroup {
  items: Item[]
  num_items: number
}

export interface Item {
  item_id: number
  model_id: number
  shop_id: number
  name: string
  model_name: string
  image: string
  amount: number
  ext_info: ExtInfo
  status: number
  item_price: number
  price_before_discount: number
  order_price: number
  snapshot_id: number
}

export interface ExtInfo {
  add_on_deal_id: number
  is_add_on_sub_item: boolean
  free_return_day: number
  is_wholesale: boolean
  is_pre_order: boolean
  is_membership_gift: boolean
  is_free_return: boolean
}

export interface PaymentInfo {
  currency: string
  total_price: number
  info_rows: InfoRow[]
}

export interface InfoRow {
  info_label: InfoLabel
  info_value: InfoValue
  info_tooltip?: InfoTooltip
}

export interface InfoLabel {
  text: string
  tl: boolean
  attributes?: Attribute5[]
}

export interface Attribute5 {
  name: string
  type: number
  label: Label2
}

export interface Label2 {
  text: string
  tl: boolean
}

export interface InfoValue {
  value: string
  type: number
}

export interface InfoTooltip {
  tooltip: Tooltip2
  icon_type: number
}

export interface Tooltip2 {
  text: string
  tl: boolean
}

export interface PaymentMethod {
  payment_method: number
  payment_channel_name: PaymentChannelName
  can_change_payment_method: boolean
}

export interface PaymentChannelName {
  text: string
  tl: boolean
}

export interface Coins {
  coin_earn: number
  coin_basic_earn: number
  redirect_to_coin_page: boolean
  popup_msg: PopupMsg2
}

export interface PopupMsg2 {
  text: string
  tl: boolean
}

export interface PcProcessingInfo {
  create_time: number
  shipping_confirm_time: number
  pay_time: number
  cancel_reason: number
  delivery_time: number
  is_rated: boolean
  order_payment_method: number
  order_request_type: number
  paid_amount: number
  order_sn: string
}

export interface SecondaryButton {
  id: number
}

export interface PrimaryButton {
  id: number
  popup_msg: PopupMsg3
}

export interface PopupMsg3 {
  text: string
  tl: boolean
  attributes: Attribute6[]
}

export interface Attribute6 {
  name: string
  value: string
  type: number
}

export interface NotificationBar {
  content: string
}
