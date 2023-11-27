export const menus = [
  {
    label: 'Quản trị khách hàng',
    code: 'customer-mgmt-system',
    class: 'navigation-header',
    items: [
      {
        label: '1. Theo dõi doanh số khách hàng theo sản phẩm',
        routerLink: '/customer-mgmt-system/follow-up-customer-sales-product',
        class: 'nav-item'
      },
      {
        label: '2. Theo dõi doanh số khách hàng theo chu kỳ',
        routerLink: '/customer-mgmt-system/follow-up-customer-cycle',
        class: 'nav-item'
      },
      {label: '3. Theo dõi theo giá trị đơn hàng', routerLink: '/customer-mgmt-system/follow-order-value', class: 'nav-item'},
      {
        label: '4. Theo dõi doanh số khách hàng theo khu vực',
        routerLink: '/customer-mgmt-system/follow-up-customer-sales-area',
        class: 'nav-item'
      },
      {label: '5. Theo dõi công nợ khách hàng', routerLink: '/customer-mgmt-system/follow-debt-customer', class: 'nav-item'},

    ]
  },
  {
    label: 'Quản trị sản phẩm',
    code: 'product-manager',
    class: 'navigation-header',
    items: [
      {label: '1. Theo dõi sản phẩm chu kỳ khách hàng', routerLink: '/product-manager/customer-by-product-category', class: 'nav-item'},
      {label: '2. Theo dõi sản phẩm theo khách hàng', routerLink: '/product-manager/track-customer-by-product', class: 'nav-item'},
    ]
  },
  {
    label: 'Đối soát tài chính',
    code: 'financial-control-system',
    class: 'navigation-header',
    items: [
      {
        label: '1. Đối soát dòng tiền với doanh số',
        routerLink: '/financial-control-system/review-revenue-with-flow-of-money',
        class: 'nav-item'
      },
      {label: '2. Đối Soát Thực trả nhà cung cấp', routerLink: '/financial-control-system/review-payment-with-supplier', class: 'nav-item'},
      {label: '3. Kiểm soát công nợ nhà cung cấp', routerLink: '/financial-control-system/review-supplier-debt', class: 'nav-item'},
      {label: '4. Kiểm soát công nợ khách hàng', routerLink: '/financial-control-system/customer-debt', class: 'nav-item'},
      {
        label: '5. Công nợ nhà cung cấp phát sinh theo sản phẩm',
        routerLink: '/financial-control-system/review-supplier-debt-by-product',
        class: 'nav-item'
      },
    ]
  },
  {
    label: 'Tiện ích',
    code: 'utility',
    class: 'navigation-header',
    items: [
      {label: '1. Danh sách khách hàng đến chu kỳ mua', routerLink: '/utility/comming-up-customer', class: 'nav-item'},
    ]
  },
  {
    label: 'Nhập hóa đơn',
    code: 'order-purchase',
    class: 'navigation-header',
    items: [
      {label: '1. Nhập hoá đơn từ tệp ảnh', routerLink: '/order-purchase/input-purchase-order', class: 'nav-item'},
      {label: '2. Upload ảnh', routerLink: '/order-purchase/upload-image', class: 'nav-item'},
      {label: '3. Danh sách hoá đơn đọc tự động', routerLink: '/order-purchase/list-image-purchase-order', class: 'nav-item'},
    ]
  },
  {
    label: 'Đồng bộ',
    code: 'listsync',
    class: 'nav-item',
    routerLink: '/sync/listsync',
    isExternalLink: true
  },
  {
    label: 'Đối soát thu ngân',
    code: 'review',
    class: 'nav-item',
    isExternalLink: true,
    items: [
      {label: '1. Mở đóng quầy', routerLink: '/review/', class: 'nav-item'},
      {label: '2. Đối soát', routerLink: '/review/review-transfer-inday', class: 'nav-item'},
    ]
  },
];

export const menuItems = [
  {
    label: 'Tổng quan',
    icon: 'pi pi-fw pi-video',
  },
  {
    label: 'Thiết lập dữ liệu',
    icon: 'pi pi-fw pi-users',
    items: []
  },
  {
    label: 'Báo cáo',
    icon: 'pi pi-fw pi-calendar',
    items: [
      [
        {
          label: 'Khách hàng',
          items: [
            {
              label: 'Chu kỳ khách hàng',
              routerLink: '/bao-cao/v1/report/follow-up-customer-cycle',
            },
            {
              label: 'Chu kỳ doanh thu',
              routerLink: '/bao-cao/v1/report/follow-order-value',
            },
            {
              label: 'Chu kỳ sản phẩm',
              routerLink: '/bao-cao/v1/report/follow-up-customer-sales-product',
            },
            {
              label: 'Công nợ vượt định mức',
              routerLink: '/bao-cao/v1'
            },
          ]
        }
      ],
      [
        {
          label: 'Sản phẩm',
          items: [
            {label: 'Không đạt biên lợi nhuận'},
            {label: 'Không có lãi'},
            {label: 'Hỏng, hủy'},
            {label: 'Giảm theo nhu cầu'},
          ]
        }
      ],
      [
        {
          label: 'Nhà cung cấp',
          items: [
            {label: 'Có số lượng hàng hỏng, hủy'},
            {label: 'Có công nợ đến kỳ'}
          ]
        }
      ],
      [
        {
          label: 'Tài chính',
          items: [
            {label: 'Lệch quỹ tiền mặt quá định mức'},
            {label: 'Lệch tiền chuyển về tài khoản'},
            {label: 'Lẹch tiền chuyển về ngân hàng'},
          ]
        }
      ]
    ]
  },
  {
    label: 'Đối soát tài chính',
    icon: 'pi pi-fw pi-cog',
    items: [
      [
        {
          label: '',
          items: [
            {label: 'Đối soát dòng tiền với doanh số'},
            {label: 'Đối soát thực trả nhà cung cấp'},
            {label: 'Đối soát công nợ nhà cung cấp'},
            {label: 'Kiểm soát công nợ khách hàng'},
            {label: 'Công nợ nhà cung cấp theo sản phẩm'},
          ]
        },
      ]
    ]
  },
  {
    label: 'Đối soát thu nhân',
    icon: 'pi pi-fw pi-cog',
    items: [
      [
        {
          label: '',
          items: [
            {label: 'Mở đóng quầy'},
            {label: 'Đối soát'},
          ]
        },
      ]
    ]
  },
  {
    label: 'Đồng bộ',
    icon: 'pi pi-fw pi-cog',
    items: []
  }
];



