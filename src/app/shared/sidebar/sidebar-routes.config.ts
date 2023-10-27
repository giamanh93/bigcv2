export const menus = [
    //   {
    //       label: 'Cảnh báo sớm',
    //       code: "early-warning-system",
    //       class: 'navigation-header',
    //       items: [
    //           { label: '1. Nhóm cảnh báo liên quan đến sản phẩm', routerLink: '/early-warning-system/group-warning-product', class: 'nav-item', },
    //           { label: '2. Nhóm cảnh báo liên quan đến khách hàng', routerLink: '/early-warning-system/group-warning-customer', class: 'nav-item', },
    //           { label: '3. Nhóm cảnh báo liên quan đến chốt quầy', routerLink: '/early-warning-system/group-warning-counter', class: 'nav-item', },
    //           { label: '4. Nhóm cảnh báo liên quan đến nhà cung cấp', routerLink: '/early-warning-system/group-warning-supplier', class: 'nav-item', },
    //       ]
    //   },
    //   {
    //       label: 'Kiểm soát',
    //       code: 'control-system',
    //       class: 'navigation-header',
    //       items: [
    //           { label: '1. Kiểm soát công nợ nhà cung cấp', routerLink: '/control-system/take-control-debt-supplier', class: 'nav-item' },
    //           { label: '2. Kiểm soát công nợ khách hàng', routerLink: '/control-system/take-control-debt-customer', class: 'nav-item' },
    //           { label: '3. Kiểm soát thất thoát hàng hóa', routerLink: '/control-system/take-control-loss-product', class: 'nav-item' },
    //           { label: '4. Kiểm soát thất thoát thu ngân', routerLink: '/control-system/take-control-loss-counter', class: 'nav-item' },
    //           { label: '5. Kiểm soát chi phí', routerLink: '/control-system/take-control-costs', class: 'nav-item' },
    //       ]
    //   },

    //   {
    //       label: 'Quản trị nhà cung cấp',
    //       code: 'supplier-mgmt-system',
    //       class: 'navigation-header',
    //       items: [
    //           { label: '1. Theo dõi lợi nhuận sản phẩm nhà cung cấp', routerLink: '/supplier-mgmt-system/follow-profit-product-supplier', class: 'nav-item' },
    //           { label: '2. Theo dõi sản phẩm hỏng hủy theo từng nhà cung cấp', routerLink: '/supplier-mgmt-system/follow-product-cancel-supplier', class: 'nav-item' },
    //           { label: '3. Theo dõi hiệu quả chiến dịch khuyến mãi từng nhà cung cấp', routerLink: '/supplier-mgmt-system/follow-effective-promotion-supplier', class: 'nav-item' },
    //           { label: '4. Theo dõi lượng hàng tồn theo từng nhà cung cấp', routerLink: '/supplier-mgmt-system/follow-inventory-supplier', class: 'nav-item' },
    //       ]
    //   },
    // 0200f578-4b8e-45e8-99eb-c5446db7efb6

  {
    label: 'Báo cáo',
    code: 'bao-cao',
    class: 'navigation-header',
    routerLink: '/bao-cao/#',
    items: []
  },

    {
        label: 'Quản trị khách hàng',
        code: 'customer-mgmt-system',
        class: 'navigation-header',
        items: [
            { label: '1. Theo dõi doanh số khách hàng theo sản phẩm', routerLink: '/customer-mgmt-system/follow-up-customer-sales-product', class: 'nav-item' },
            { label: '2. Theo dõi doanh số khách hàng theo chu kỳ', routerLink: '/customer-mgmt-system/follow-up-customer-cycle', class: 'nav-item' },
            { label: '3. Theo dõi theo giá trị đơn hàng', routerLink: '/customer-mgmt-system/follow-order-value', class: 'nav-item' },
            { label: '4. Theo dõi doanh số khách hàng theo khu vực', routerLink: '/customer-mgmt-system/follow-up-customer-sales-area', class: 'nav-item' },
            { label: '5. Theo dõi công nợ khách hàng', routerLink: '/customer-mgmt-system/follow-debt-customer', class: 'nav-item' },

        ]
    },
    {
        label: 'Quản trị sản phẩm',
        code: 'product-manager',
        class: 'navigation-header',
        items: [
            { label: '1. Theo dõi sản phẩm chu kỳ khách hàng', routerLink: '/product-manager/customer-by-product-category', class: 'nav-item' },
            { label: '2. Theo dõi sản phẩm theo khách hàng', routerLink: '/product-manager/track-customer-by-product', class: 'nav-item' },
        ]
    },
    // 7f991b49-4816-4b89-ba83-4996cfc8966e

    {
        label: 'Đối soát tài chính',
        code: 'financial-control-system',
        class: 'navigation-header',
        items: [
            { label: '1. Đối soát dòng tiền với doanh số', routerLink: '/financial-control-system/review-revenue-with-flow-of-money', class: 'nav-item' },
            { label: '2. Đối Soát Thực trả nhà cung cấp', routerLink: '/financial-control-system/review-payment-with-supplier', class: 'nav-item' },
            { label: '3. Kiểm soát công nợ nhà cung cấp', routerLink: '/financial-control-system/review-supplier-debt', class: 'nav-item' },
            { label: '4. Kiểm soát công nợ khách hàng', routerLink: '/financial-control-system/customer-debt', class: 'nav-item' },
            { label: '5. Công nợ nhà cung cấp phát sinh theo sản phẩm', routerLink: '/financial-control-system/review-supplier-debt-by-product', class: 'nav-item' },
            //   { label: '5. Theo dõi công nợ nhà cung cấp', routerLink: '/cai-dat/quan-ly-ngay-nghi', class: 'nav-item' },
        ]
    },
    {
        label: 'Tiện ích',
        code: 'utility',
        class: 'navigation-header',
        items: [
            { label: '1. Danh sách khách hàng đến chu kỳ mua', routerLink: '/utility/comming-up-customer', class: 'nav-item' },
        ]
    },
    {
        label: 'Nhập hóa đơn',
        code: 'order-purchase',
        class: 'navigation-header',
        items: [
            { label: '1. Nhập hoá đơn từ tệp ảnh', routerLink: '/order-purchase/input-purchase-order', class: 'nav-item' },
            { label: '2. Upload ảnh', routerLink: '/order-purchase/upload-image', class: 'nav-item' },
            { label: '3. Danh sách hoá đơn đọc tự động', routerLink: '/order-purchase/list-image-purchase-order', class: 'nav-item' },
        ]
    },
  {
    label: 'Đồng bộ',
    code: 'listsync',
    class: 'nav-item',
    routerLink: '/sync/listsync',
    isExternalLink: true
    // items: [
    //   { label: '1. Nhập hoá đơn từ tệp ảnh', routerLink: '/order-purchase/input-purchase-order', class: 'nav-item' },
    //   { label: '2. Upload ảnh', routerLink: '/order-purchase/upload-image', class: 'nav-item' },
    //   { label: '3. Danh sách hoá đơn đọc tự động', routerLink: '/order-purchase/list-image-purchase-order', class: 'nav-item' },
    // ]
  },
  {
    label: 'Đối soát thu ngân',
    code: 'review',
    class: 'nav-item',
    isExternalLink: true,
    items: [
      { label: '1. Mở đóng quầy', routerLink: '/review/', class: 'nav-item' },
      { label: '2. Đối soát', routerLink: '/review/review-transfer-inday', class: 'nav-item' },
    ]
  },
    // a68dc8d0-707e-4446-b397-622ecc7eceb4


];



