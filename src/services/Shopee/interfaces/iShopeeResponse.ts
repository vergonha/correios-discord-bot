export interface iShopeeResponse {
    error: number
    error_msg: string
    data: Data
  }
  
  export interface Data {
    status: Status
    shipping: Shipping
    address: Address
    info_card: InfoCard
    payment_method: PaymentMethod
    processing_info: ProcessingInfo
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
    info_popup: InfoPopup
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
  
  export interface InfoPopup {
    title: Title
    msg: Msg
    primary_action: PrimaryAction
    secondary_action: SecondaryAction
  }
  
  export interface Title {
    text: string
    tl: boolean
  }
  
  export interface Msg {
    text: string
    tl: boolean
    attributes: Attribute3[]
  }
  
  export interface Attribute3 {
    name: string
    value: string
    type: number
  }
  
  export interface PrimaryAction {
    action_code: number
    button_text_key: ButtonTextKey
  }
  
  export interface ButtonTextKey {
    text: string
    tl: boolean
  }
  
  export interface SecondaryAction {
    action_code: number
    button_text_key: ButtonTextKey2
  }
  
  export interface ButtonTextKey2 {
    text: string
    tl: boolean
  }
  
  export interface Shipping {
    fulfilment_carrier: FulfilmentCarrier
    tracking_number: string
    tracking_info: TrackingInfo
    is_multi_parcel: boolean
    num_parcels: number
    parcel_no: number
    can_modify_fulfilment_channel: boolean
    fulfilment_carrier_channel_id: number
    disable_edit_fulfilment_channel_reason: string
    fulfilment_channel_updatability: number
  }
  
  export interface FulfilmentCarrier {
    text: string
    tl: boolean
  }
  
  export interface TrackingInfo {
    driver_phone: string
    driver_name: string
    ctime: number
    description: string
    type: number
    pin_code: string
  }
  
  export interface Address {
    shipping_name: string
    shipping_phone: string
    shipping_address: string
    is_buyer_address_editable: boolean
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
  }
  
  export interface InfoLabel {
    text: string
    tl: boolean
    attributes?: Attribute4[]
  }
  
  export interface Attribute4 {
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
  
  export interface PaymentMethod {
    payment_method: number
    payment_channel_name: PaymentChannelName
    can_change_payment_method: boolean
  }
  
  export interface PaymentChannelName {
    text: string
    tl: boolean
  }
  
  export interface ProcessingInfo {
    order_sn: string
    info_rows: InfoRow2[]
  }
  
  export interface InfoRow2 {
    info_label: InfoLabel2
    info_value: InfoValue2
  }
  
  export interface InfoLabel2 {
    text: string
    tl: boolean
  }
  
  export interface InfoValue2 {
    value: string
    type: number
  }
  
  export interface SecondaryButton {
    id: number
  }
  
  export interface PrimaryButton {
    id: number
    popup_msg: PopupMsg2
  }
  
  export interface PopupMsg2 {
    text: string
    tl: boolean
    attributes: Attribute5[]
  }
  
  export interface Attribute5 {
    name: string
    value: string
    type: number
  }
  
  export interface NotificationBar {
    content: string
  }
  