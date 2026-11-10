// =============================================================================
// RestoChain OS — Comprehensive Tri-Lingual Internationalization (AR / FR / EN)
// Built specifically for hospitality enterprise chains operating internationally
// =============================================================================

export type Locale = 'ar' | 'fr' | 'en';

export interface Translations {
  // Brand & General
  brandTitle: string;
  brandTagline: string;
  currency: string;
  systemSyncActive: string;
  chainStatus: string;
  activeShiftNotice: string;
  todaySales: string;
  switchBranchPrompt: string;
  activeBranchBadge: string;
  close: string;
  cancel: string;
  confirm: string;
  loading: string;
  actions: string;
  search: string;

  // Nav Items
  navHq: string;
  navPos: string;
  navKds: string;
  navInventory: string;
  navShifts: string;
  navDelivery: string;

  // HQ Dashboard
  hqTitle: string;
  hqSubtitle: string;
  hqBadge: string;
  hqOpenPos: string;
  hqLiveKds: string;
  hqInventoryBtn: string;
  kpiTotalRevenue: string;
  kpiComparedLastWeek: string;
  kpiActiveOrders: string;
  kpiAvgCookTime: string;
  kpiTableOccupancy: string;
  kpiOccupiedCount: string;
  kpiFoodCostAvg: string;
  kpiTargetRange: string;
  branchPerformanceTitle: string;
  branchPerformanceSubtitle: string;
  branchConnectedCount: string;
  branchSalesToday: string;
  branchActiveOrders: string;
  branchTables: string;
  branchManager: string;
  posCardTitle: string;
  posCardDesc: string;
  kdsCardTitle: string;
  kdsCardDesc: string;
  shiftsCardTitle: string;
  shiftsCardDesc: string;

  // Cloud POS
  posTitle: string;
  posSubtitle: string;
  posStationBadge: string;
  dineIn: string;
  takeaway: string;
  delivery: string;
  floorPlanTitle: string;
  tableAvailable: string;
  tableOccupied: string;
  tableBillRequested: string;
  tableReserved: string;
  tableLabel: string;
  seatsLabel: string;
  allCategories: string;
  searchMenuPlaceholder: string;
  multipleSizesBadge: string;
  currentOrderTitle: string;
  tableTag: string;
  itemsInCart: string;
  emptyCartTitle: string;
  emptyCartDesc: string;
  clearCartBtn: string;
  perItem: string;
  kitchenNotesLabel: string;
  kitchenNotesPlaceholder: string;
  promoCodePlaceholder: string;
  applyPromoBtn: string;
  subtotalHt: string;
  vatLabel: string;
  discountApplied: string;
  totalNet: string;
  payAndPrintBtn: string;
  sendKdsOnlyBtn: string;
  customizeTitle: string;
  chooseSize: string;
  optionalAddons: string;
  chefNoteLabel: string;
  chefNotePlaceholder: string;
  addToOrderBtn: string;
  paymentModalTitle: string;
  amountDue: string;
  paymentMethod: string;
  payCash: string;
  payCard: string;
  payDeliveryApp: string;
  cashReceived: string;
  changeDue: string;

  // Thermal Receipt
  receiptFiscalTitle: string;
  receiptTicketNo: string;
  receiptDateTime: string;
  receiptType: string;
  receiptServer: string;
  receiptItem: string;
  receiptQty: string;
  receiptTotal: string;
  receiptGrossHt: string;
  receiptVat: string;
  receiptNetTotal: string;
  receiptPayMethod: string;
  receiptFiscalNotice: string;
  receiptThankYou: string;
  receiptPrintBtn: string;

  // KDS Kitchen Display
  kdsTitle: string;
  kdsSubtitle: string;
  kdsLiveBadge: string;
  kdsActiveTicketsCount: string;
  stationAll: string;
  stationGrill: string;
  stationPizza: string;
  stationCold: string;
  stationBar: string;
  colNew: string;
  colPreparing: string;
  colReady: string;
  noNewOrders: string;
  noPrepOrders: string;
  noReadyOrders: string;
  timerNormal: string;
  timerWarning: string;
  timerCritical: string;
  startCookingBtn: string;
  markReadyBtn: string;
  servedBtn: string;
  waitingRunner: string;
  itemsCountText: string;
  responsibleServer: string;

  // Inventory & Costing
  invTitle: string;
  invSubtitle: string;
  invActiveWarehouse: string;
  invRegisteredCount: string;
  tabStock: string;
  tabRecipes: string;
  tabTransfer: string;
  invTableTitle: string;
  invCriticalNotice: string;
  thIngredient: string;
  thUnit: string;
  thCurrentStock: string;
  thMinThreshold: string;
  thUnitCost: string;
  thStatus: string;
  thQuickAdjust: string;
  statusCritical: string;
  statusGood: string;
  recipesHeaderTitle: string;
  recipesHeaderSubtitle: string;
  sellingPrice: string;
  rawIngredientCost: string;
  grossMargin: string;
  costLabel: string;
  transferTitle: string;
  transferSubtitle: string;
  sourceBranch: string;
  destinationBranch: string;
  transferItemSelect: string;
  transferQty: string;
  executeTransferBtn: string;
  transferSuccessNotice: string;

  // Shifts & Z-Report
  shiftsTitle: string;
  shiftsSubtitle: string;
  shiftsStaffActive: string;
  runZReportBtn: string;
  rosterTitle: string;
  lunchShiftName: string;
  onDuty: string;
  roleCashier: string;
  roleHeadChef: string;
  roleWaiter: string;
  roleCourier: string;
  roleManager: string;
  startedAt: string;
  zClosingTitle: string;
  zClosingSubtitle: string;
  zSuccessNotice: string;
  cashCountLabel: string;
  cashierInCharge: string;
  closingTimeLabel: string;
  calculateEcartBtn: string;
  zReportNumber: string;
  grossSalesText: string;
  taxCollectedText: string;
  cardPaymentsText: string;
  deliveryPaymentsText: string;
  expectedCashText: string;
  actualCashText: string;
  cashDiscrepancy: string;
  perfectMatch: string;
  discrepancyAlert: string;
  printZNotice: string;

  // Delivery Fleet
  deliveryTitle: string;
  deliverySubtitle: string;
  couriersActiveCount: string;
  couriersFleetTitle: string;
  statusAvailable: string;
  statusOnDelivery: string;
  statusOffline: string;
  changeStatusBtn: string;
  liveOrdersTitle: string;
  assignCourierBtn: string;
  onTheWay: string;
  driverLabel: string;
  plateLabel: string;
  todayDeliveries: string;

  // Footer
  footerDesc: string;
  fiscalCompliance: string;
  taxIdLabel: string;
}

export const TRANSLATIONS: Record<Locale, Translations> = {
  ar: {
    brandTitle: 'ريستو تشين',
    brandTagline: 'إدارة سلاسل المطاعم ونقاط البيع السحابية',
    currency: 'د.ت',
    systemSyncActive: 'نظام المزامنة السحابي نشط',
    chainStatus: 'شبكة الفروع: 4 فروع متصلة بالزمن الفعلي • الدقة المالية 100%',
    activeShiftNotice: 'الوردية النشطة: الغداء (Shift #104)',
    todaySales: 'مبيعات اليوم',
    switchBranchPrompt: 'تبديل الفرع المباشر (Multi-Location)',
    activeBranchBadge: 'الفرع النشط',
    close: 'إغلاق',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    loading: 'جار التحميل...',
    actions: 'الإجراءات',
    search: 'بحث...',

    navHq: 'القيادة المركزية HQ',
    navPos: 'نقطة البيع POS',
    navKds: 'شاشة المطبخ KDS',
    navInventory: 'المخزون والتكاليف',
    navShifts: 'الورديات وتقرير Z',
    navDelivery: 'أسطول التوصيل',

    hqTitle: 'لوحة القيادة المركزية HQ الموحدة',
    hqSubtitle: 'متابعة فورية للمبيعات اللحظية، مؤشرات الأداء التشغيلية، مراقبة المخزون، ونسب تكلفة الوجبات عبر كافة فروع السلسلة.',
    hqBadge: 'نظام الإدارة المركزي لسلاسل المطاعم الفاخرة',
    hqOpenPos: 'فتح نقطة البيع Cloud POS',
    hqLiveKds: 'شاشة المطبخ KDS (بث مباشر)',
    hqInventoryBtn: 'المخزون وتكلفة الوجبات',
    kpiTotalRevenue: 'مبيعات السلسلة الإجمالية اليوم',
    kpiComparedLastWeek: 'مقارنة بالأسبوع الماضي',
    kpiActiveOrders: 'الطلبات النشطة عبر الفروع',
    kpiAvgCookTime: 'متوسط وقت التحضير: 12.4 دقيقة',
    kpiTableOccupancy: 'نسبة إشغال الطاولات (فرعك)',
    kpiOccupiedCount: 'طاولات محجوزة',
    kpiFoodCostAvg: 'متوسط تكلفة الأغذية (Food Cost)',
    kpiTargetRange: 'ضمن النطاق الأمثل المستهدف (25-32%)',
    branchPerformanceTitle: 'مقارنة أداء الفروع في الزمن الحقيقي (Live Multi-Branch Network)',
    branchPerformanceSubtitle: 'اضغط على أي فرع للتبديل الفوري وإدارة العمليات الميدانية الخاصة به.',
    branchConnectedCount: '4 فروع متصلة سحابياً',
    branchSalesToday: 'مبيعات اليوم:',
    branchActiveOrders: 'طلبات جارية:',
    branchTables: 'الطاولات:',
    branchManager: 'مدير الفرع:',
    posCardTitle: 'نقطة البيع السحابية Cloud POS',
    posCardDesc: 'بناء طلبات فوري، اختيار الطاولات، تخصيص الأصناف والإضافات، واحتساب الضرائب مع طباعة الفواتير الحرارية.',
    kdsCardTitle: 'شاشة المطبخ الذكية KDS',
    kdsCardDesc: 'مزامنة مباشرة مع الطهاة، مؤقتات دقيقة للتأخير باللونين الأصفر والأحمر، وتأكيد جاهزية الأطباق بضغطة زر.',
    shiftsCardTitle: 'الورديات وتقرير Z المالي',
    shiftsCardDesc: 'مطابقة صندوق النقدية اليومية، احتساب فوارق الكاشير بدقة، وإغلاق الوردية وفق القوانين الجبائية.',

    posTitle: 'نقطة البيع السحابية Cloud POS',
    posSubtitle: 'محطة متصلة بالشبكة ومزامنة فورية مع المطبخ',
    posStationBadge: 'محطة #01 - متصلة',
    dineIn: 'صالة (Sur Place)',
    takeaway: 'سفري (À Emporter)',
    delivery: 'توصيل (Livraison)',
    floorPlanTitle: 'اختر الطاولة المفتوحة (Plan de Salle):',
    tableAvailable: 'شاغرة',
    tableOccupied: 'مشغولة',
    tableBillRequested: 'تطلب الحساب',
    tableReserved: 'محجوزة',
    tableLabel: 'طاولة',
    seatsLabel: 'مقاعد',
    allCategories: 'الكل (All)',
    searchMenuPlaceholder: 'بحث في القائمة...',
    multipleSizesBadge: 'أحجام متعددة',
    currentOrderTitle: 'طلب جاري',
    tableTag: 'طاولة',
    itemsInCart: 'أصناف في السلة',
    emptyCartTitle: 'السلة فارغة حالياً',
    emptyCartDesc: 'اضغط على أي صنف من القائمة لإضافته للطلب',
    clearCartBtn: 'إفراغ',
    perItem: 'د.ت للقطعة',
    kitchenNotesLabel: 'ملاحظات المطبخ الخاصة (Instructions Chef):',
    kitchenNotesPlaceholder: 'مثال: بدون بصل، ستيك نصف استواء...',
    promoCodePlaceholder: 'كود خصم (RESTO10)',
    applyPromoBtn: 'تطبيق',
    subtotalHt: 'المجموع الأولي (HT):',
    vatLabel: 'الأداء على القيمة المضافة (TVA 7%):',
    discountApplied: 'خصم ترويجي:',
    totalNet: 'المجموع النهائي الصافي:',
    payAndPrintBtn: 'دفع وطباعة الفاتورة',
    sendKdsOnlyBtn: 'إرسال للمطبخ فقط (Send to KDS)',
    customizeTitle: 'تخصيص الوجبة',
    chooseSize: 'اختر الحجم / التشكيلة:',
    optionalAddons: 'إضافات اختيارية (Suppléments):',
    chefNoteLabel: 'ملاحظة للشيف:',
    chefNotePlaceholder: 'مثال: بدون مايونيز، بدون جبن...',
    addToOrderBtn: 'إضافة للطلب',
    paymentModalTitle: 'تسجيل الدفع وإصدار الفاتورة',
    amountDue: 'المبلغ المطلوب:',
    paymentMethod: 'طريقة الدفع:',
    payCash: 'نقداً (Espèces)',
    payCard: 'بطاقة TPE',
    payDeliveryApp: 'Glovo / Yassir',
    cashReceived: 'المبلغ المستلم:',
    changeDue: 'الباقي للزبون (Monnaie à rendre):',

    receiptFiscalTitle: 'فاتورة إلكترونية مطابقة للمواصفات',
    receiptTicketNo: 'رقم التذكرة:',
    receiptDateTime: 'التاريخ والوقت:',
    receiptType: 'النوع:',
    receiptServer: 'النادل / الكاشير:',
    receiptItem: 'الصنف',
    receiptQty: 'الكمية',
    receiptTotal: 'المجموع',
    receiptGrossHt: 'المجموع الخام (HT):',
    receiptVat: 'الأداء على القيمة المضافة (TVA 7%):',
    receiptNetTotal: 'المجموع النهائي الصافي:',
    receiptPayMethod: 'طريقة الدفع:',
    receiptFiscalNotice: 'فاتورة قانونية مسجلة في السجل الرقمي المركزي',
    receiptThankYou: 'شكراً لزيارتكم • Merci pour votre visite',
    receiptPrintBtn: 'طباعة التذكرة الحرارية (80mm)',

    kdsTitle: 'شاشة المطبخ الذكية (KDS - Kitchen Display)',
    kdsSubtitle: 'بث حي ومباشر لمحطات الطهي مع مؤقتات التأخير',
    kdsLiveBadge: 'بث حي ومباشر',
    kdsActiveTicketsCount: 'طلبات نشطة',
    stationAll: 'كافة المحطات',
    stationGrill: 'محطة الشواء (Grill)',
    stationPizza: 'فرن البيتزا (Pizza)',
    stationCold: 'المقبلات والسلطات',
    stationBar: 'المشروبات والبار',
    colNew: 'طلبات جديدة (New)',
    colPreparing: 'قيد الطهي والتحضير (Cooking)',
    colReady: 'جاهز للتقديم (Ready to Serve)',
    noNewOrders: 'لا توجد طلبات جديدة في الانتظار',
    noPrepOrders: 'لا توجد طلبات قيد التحضير حالياً',
    noReadyOrders: 'لا توجد طلبات تنتظر الاستلام',
    timerNormal: 'دقيقة (طبيعي)',
    timerWarning: 'دقيقة (متوسط)',
    timerCritical: 'دقيقة (تأخير حرج)',
    startCookingBtn: 'بدء التحضير الآن (Start Cooking)',
    markReadyBtn: 'جاهز للتقديم (Mark as Ready)',
    servedBtn: 'تم التسليم على الطاولة (Served)',
    waitingRunner: 'في انتظار النادل',
    itemsCountText: 'عدد الأصناف:',
    responsibleServer: 'النادل المسؤول:',

    invTitle: 'المخزون المركزي وتكلفة الوجبات',
    invSubtitle: 'مراقبة التكاليف الفورية ونسب الهامش الربحي',
    invActiveWarehouse: 'المستودع النشط:',
    invRegisteredCount: 'مواد أولية',
    tabStock: 'جرد المواد الأولية',
    tabRecipes: 'نسبة تكلفة الوجبات (Food Cost %)',
    tabTransfer: 'التحويل بين الفروع',
    invTableTitle: 'جدول المواد الأولية ومستويات إعادة الطلب (Stock Reorder Levels)',
    invCriticalNotice: 'مواد تقترب من النفاد',
    thIngredient: 'المادة الأولية',
    thUnit: 'الوحدة',
    thCurrentStock: 'المخزون الحالي',
    thMinThreshold: 'حد الأمان (Alert)',
    thUnitCost: 'تكلفة الوحدة',
    thStatus: 'الحالة',
    thQuickAdjust: 'تعديل سريع',
    statusCritical: 'مخزون حرج',
    statusGood: 'كافٍ',
    recipesHeaderTitle: 'حساب هامش الربح ونسبة تكلفة الغذاء (Recipe Costing & Profit Margin)',
    recipesHeaderSubtitle: 'المعيار العالمي للمطاعم الفاخرة يتراوح بين 25% و 32% لضمان ربحية عالية واستدامة تشغيلية.',
    sellingPrice: 'سعر البيع للزبون:',
    rawIngredientCost: 'تكلفة المكونات:',
    grossMargin: 'هامش الربح الخام:',
    costLabel: 'تكلفة:',
    transferTitle: 'طلب تحويل مواد أولية بين الفروع',
    transferSubtitle: 'إعادة توازن المخزون اللوجستي لتفادي نفاد المواد في الفروع ذات الإقبال العالي.',
    sourceBranch: 'من الفرع المصدر (Source Branch):',
    destinationBranch: 'إلى الفرع الوجهة (Destination Branch):',
    transferItemSelect: 'المادة المراد نقلها:',
    transferQty: 'الكمية المراد نقلها:',
    executeTransferBtn: 'تنفيذ التحويل وتأكيد إذن الشحن',
    transferSuccessNotice: 'تم تحويل الكمية بنجاح وتحديث أرصدة المخزون السحابي!',

    shiftsTitle: 'إدارة الورديات وتقرير الإغلاق Z',
    shiftsSubtitle: 'المطابقة المالية اليومية وحساب فوارق الصندوق بدقة',
    shiftsStaffActive: 'موظفين نشطين',
    runZReportBtn: 'إغلاق الصندوق وإصدار تقرير Z',
    rosterTitle: 'طاقم العمل المسجل في الوردية النشطة (Shift In-Progress)',
    lunchShiftName: 'وردية الغداء (11:00 - 17:00)',
    onDuty: 'على رأس العمل',
    roleCashier: 'مسؤول الصندوق (Cashier)',
    roleHeadChef: 'رئيس الطهاة (Head Chef)',
    roleWaiter: 'نادل صالة (Server)',
    roleCourier: 'سائق توصيل (Courier)',
    roleManager: 'مدير الصالة (Floor Mgr)',
    startedAt: 'بدأ:',
    zClosingTitle: 'مطابقة صندوق النقدية وإصدار تقرير Z اليومي (Rapport Z de Clôture)',
    zClosingSubtitle: 'تقرير الإغلاق المالي اليومي الإلزامي لمطابقة المقابيض النقدية مع المعاملات الإلكترونية والضريبية.',
    zSuccessNotice: 'تم توليد تقرير Z بنجاح! تم حفظ البيانات في السجل المالي غير القابل للتعديل.',
    cashCountLabel: 'النقدية المعدودة في الدرج (Espèces comptées en caisse):',
    cashierInCharge: 'المسؤول عن الإغلاق:',
    closingTimeLabel: 'توقيت الإغلاق:',
    calculateEcartBtn: 'تأكيد الإغلاق واحتساب الفارق (Calculer Écart)',
    zReportNumber: 'رقم تقرير Z:',
    grossSalesText: 'المبيعات الإجمالية الخام (Gross Sales):',
    taxCollectedText: 'الضريبة المحصلة TVA (7% & 19%):',
    cardPaymentsText: 'مدفوعات البطاقة البنكية TPE:',
    deliveryPaymentsText: 'مدفوعات تطبيقات التوصيل:',
    expectedCashText: 'النقدية المتوقعة في الدرج (Expected Cash):',
    actualCashText: 'النقدية الفعلية المدخلة:',
    cashDiscrepancy: 'فارق الصندوق (Écart de caisse):',
    perfectMatch: '0.000 د.ت (مطابقة تامة 100%)',
    discrepancyAlert: 'يوجد فارق نقدي غير مطابق!',
    printZNotice: 'طباعة إشعار Z المالي',

    deliveryTitle: 'إدارة أسطول التوصيل والتطبيقات',
    deliverySubtitle: 'مزامنة قنوات التوصيل وإدارة السائقين في الزمن الحقيقي',
    couriersActiveCount: 'سائقين متصلين',
    couriersFleetTitle: 'أسطول السائقين الداخلي (Fleet Drivers)',
    statusAvailable: 'متاح للطلب',
    statusOnDelivery: 'في مهمة توصيل',
    statusOffline: 'غير متصل',
    changeStatusBtn: 'تغيير الحالة',
    liveOrdersTitle: 'قائمة الطلبات الجارية عبر المنصات (Live Delivery Dispatch)',
    assignCourierBtn: 'تعيين سائق',
    onTheWay: 'قيد التوصيل 🛵',
    driverLabel: 'السائق:',
    plateLabel: 'دراجة:',
    todayDeliveries: 'طلبات اليوم:',

    footerDesc: 'نظام الإدارة السحابية الموحدة لسلاسل المطاعم الفاخرة',
    fiscalCompliance: 'التوافق الجبائي والمطابقة القانونية التونسية (TVA 7% & 19%)',
    taxIdLabel: 'المعرف الجبائي: 1829471/B/A/M/000',
  },

  fr: {
    brandTitle: 'RestoChain OS',
    brandTagline: 'Gestion Centralisée Multi-Succursales & POS Cloud',
    currency: 'DT',
    systemSyncActive: 'Synchronisation Cloud Active',
    chainStatus: 'Réseau: 4 succursales connectées en temps réel • Précision 100%',
    activeShiftNotice: 'Service Actif: Déjeuner (Shift #104)',
    todaySales: "Ventes d'Aujourd'hui",
    switchBranchPrompt: 'Changer de Succursale (Multi-Sites)',
    activeBranchBadge: 'Succursale Active',
    close: 'Fermer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    loading: 'Chargement...',
    actions: 'Actions',
    search: 'Rechercher...',

    navHq: 'QG Central HQ',
    navPos: 'Point de Vente POS',
    navKds: 'Écran Cuisine KDS',
    navInventory: 'Stocks & Coûts',
    navShifts: 'Services & Rapport Z',
    navDelivery: 'Flotte Livraison',

    hqTitle: 'Tableau de Bord Centralisé HQ',
    hqSubtitle: 'Suivi en temps réel des ventes, indicateurs opérationnels, niveaux de stocks et ratios Food Cost à travers toutes les succursales.',
    hqBadge: 'Système ERP Premium pour Chaines de Restauration',
    hqOpenPos: 'Ouvrir POS Cloud',
    hqLiveKds: 'Écran Cuisine KDS (En direct)',
    hqInventoryBtn: 'Stocks & Food Cost',
    kpiTotalRevenue: 'Chiffre d’Affaires Réseau du Jour',
    kpiComparedLastWeek: 'vs la semaine dernière',
    kpiActiveOrders: 'Commandes en Cours sur le Réseau',
    kpiAvgCookTime: 'Temps moyen de cuisson: 12.4 min',
    kpiTableOccupancy: 'Taux d’Occupation des Tables',
    kpiOccupiedCount: 'tables occupées',
    kpiFoodCostAvg: 'Food Cost Moyen Réseau',
    kpiTargetRange: 'Dans la plage optimale ciblée (25-32%)',
    branchPerformanceTitle: 'Performance des Succursales en Direct (Live Multi-Sites)',
    branchPerformanceSubtitle: 'Cliquez sur une succursale pour basculer et piloter ses opérations locales.',
    branchConnectedCount: '4 succursales synchronisées',
    branchSalesToday: "Ventes d'aujourd'hui:",
    branchActiveOrders: 'Commandes en cours:',
    branchTables: 'Tables:',
    branchManager: 'Directeur:',
    posCardTitle: 'Point de Vente Cloud POS',
    posCardDesc: 'Prise de commande rapide, plan de salle interactif, variantes et suppléments, calcul TVA et impression de tickets thermiques.',
    kdsCardTitle: 'Écran Cuisine KDS Interactif',
    kdsCardDesc: 'Affichage des bons de commande, minuteries de retard à alertes visuelles, et validation des plats cuisinés en un clic.',
    shiftsCardTitle: 'Services & Clôture Fiscale Z',
    shiftsCardDesc: 'Comptage physique des espèces, calcul des écarts de caisse, et génération du rapport Z conforme à la réglementation.',

    posTitle: 'Terminal POS Cloud',
    posSubtitle: 'Poste connecté en direct avec la cuisine et les stocks',
    posStationBadge: 'Poste #01 - En Ligne',
    dineIn: 'Sur Place',
    takeaway: 'À Emporter',
    delivery: 'Livraison',
    floorPlanTitle: 'Sélectionnez une Table Ouverte (Plan de Salle):',
    tableAvailable: 'Disponible',
    tableOccupied: 'Occupée',
    tableBillRequested: 'Addition demandée',
    tableReserved: 'Réservée',
    tableLabel: 'Table',
    seatsLabel: 'couverts',
    allCategories: 'Tout le Menu',
    searchMenuPlaceholder: 'Rechercher un plat...',
    multipleSizesBadge: 'Multiples Formats',
    currentOrderTitle: 'Commande en Cours',
    tableTag: 'Table',
    itemsInCart: 'articles au panier',
    emptyCartTitle: 'Le panier est vide',
    emptyCartDesc: 'Cliquez sur un article du menu pour démarrer la commande',
    clearCartBtn: 'Vider',
    perItem: 'DT / unité',
    kitchenNotesLabel: 'Instructions Spéciales Cuisine (Chef):',
    kitchenNotesPlaceholder: 'Ex: sans oignons, cuisson à point, sauce à part...',
    promoCodePlaceholder: 'Code promo (RESTO10)',
    applyPromoBtn: 'Appliquer',
    subtotalHt: 'Total Hors Taxes (HT):',
    vatLabel: 'TVA Restauration (7%):',
    discountApplied: 'Remise commerciale:',
    totalNet: 'Total Net à Payer (TTC):',
    payAndPrintBtn: "Régler & Imprimer le Ticket",
    sendKdsOnlyBtn: 'Envoyer en Cuisine Seule (KDS)',
    customizeTitle: "Personnalisation de l'article",
    chooseSize: 'Choisir la portion / format:',
    optionalAddons: 'Suppléments optionnels:',
    chefNoteLabel: 'Note pour la brigade:',
    chefNotePlaceholder: 'Ex: sans mayonnaise, sans sel...',
    addToOrderBtn: 'Ajouter à la commande',
    paymentModalTitle: "Encaissement & Émission de Ticket",
    amountDue: 'Montant Total Dû:',
    paymentMethod: 'Mode de règlement:',
    payCash: 'Espèces',
    payCard: 'Carte Bancaire / TPE',
    payDeliveryApp: 'Glovo / Yassir',
    cashReceived: 'Montant remis par le client:',
    changeDue: 'Monnaie à rendre:',

    receiptFiscalTitle: 'Ticket de Caisse & Facture Électronique',
    receiptTicketNo: 'N° Ticket:',
    receiptDateTime: 'Date & Heure:',
    receiptType: 'Type:',
    receiptServer: 'Serveur / Caissier:',
    receiptItem: 'Article',
    receiptQty: 'Qté',
    receiptTotal: 'Total',
    receiptGrossHt: 'Total Brut HT:',
    receiptVat: 'TVA (7%):',
    receiptNetTotal: 'Total Net TTC:',
    receiptPayMethod: 'Paiement:',
    receiptFiscalNotice: 'Ticket fiscal enregistré dans le grand livre numérique central',
    receiptThankYou: 'Merci pour votre visite • À bientôt',
    receiptPrintBtn: 'Imprimer Ticket Thermique (80mm)',

    kdsTitle: 'Système d’Affichage Cuisine (KDS)',
    kdsSubtitle: 'Flux en direct des commandes par poste de cuisson avec chrono de retard',
    kdsLiveBadge: 'Live Streaming',
    kdsActiveTicketsCount: 'tickets actifs',
    stationAll: 'Tous les Postes',
    stationGrill: 'Poste Grillades',
    stationPizza: 'Four à Pizza',
    stationCold: 'Entrées & Salades',
    stationBar: 'Bar & Boissons',
    colNew: 'Nouvelles Commandes (New)',
    colPreparing: 'En Préparation (Cooking)',
    colReady: 'Prêt à Servir (Ready)',
    noNewOrders: 'Aucune nouvelle commande en attente',
    noPrepOrders: 'Aucun plat en cours de cuisson',
    noReadyOrders: 'Aucun plat en attente de service',
    timerNormal: 'min (normal)',
    timerWarning: 'min (attention)',
    timerCritical: 'min (retard critique)',
    startCookingBtn: 'Lancer la Cuisson (Start)',
    markReadyBtn: 'Marquer comme Prêt (Ready)',
    servedBtn: 'Servi en Salle (Served)',
    waitingRunner: 'En attente du serveur',
    itemsCountText: 'Nombre de plats:',
    responsibleServer: 'Serveur responsable:',

    invTitle: 'Gestion des Stocks & Food Cost %',
    invSubtitle: 'Contrôle instantané de la matière première et des marges brutes',
    invActiveWarehouse: 'Entrepôt actif:',
    invRegisteredCount: 'ingrédients gérés',
    tabStock: 'Inventaire Matières Premières',
    tabRecipes: 'Ratios Fiches Techniques (Food Cost %)',
    tabTransfer: 'Transfert Inter-Succursales',
    invTableTitle: 'Matières premières et seuils d’alerte de réapprovisionnement',
    invCriticalNotice: 'articles en rupture imminente',
    thIngredient: 'Ingrédient',
    thUnit: 'Unité',
    thCurrentStock: 'Stock Actuel',
    thMinThreshold: 'Seuil d’Alerte',
    thUnitCost: 'Coût Unitaire',
    thStatus: 'Statut',
    thQuickAdjust: 'Ajustement Rapide',
    statusCritical: 'Stock Critique',
    statusGood: 'Optimal',
    recipesHeaderTitle: 'Fiches Recettes & Analyse de Marge Brute',
    recipesHeaderSubtitle: 'Le ratio cible pour la restauration premium est de 25% à 32% afin d’assurer la rentabilité.',
    sellingPrice: 'Prix de Vente TTC:',
    rawIngredientCost: 'Coût Matière:',
    grossMargin: 'Marge Brute:',
    costLabel: 'Food Cost:',
    transferTitle: 'Demande de Virement de Stock Inter-Succursales',
    transferSubtitle: 'Rééquilibrage logistique pour prévenir les ruptures dans les succursales à fort trafic.',
    sourceBranch: 'Succursale Source (Départ):',
    destinationBranch: 'Succursale Destinataire (Arrivée):',
    transferItemSelect: 'Ingrédient à transférer:',
    transferQty: 'Quantité à expédier:',
    executeTransferBtn: "Valider l'Expédition & Mettre à Jour les Stocks",
    transferSuccessNotice: 'Transfert effectué avec succès ! Les stocks réseau ont été mis à jour.',

    shiftsTitle: 'Gestion des Services & Rapport Z',
    shiftsSubtitle: 'Contrôle quotidien de caisse et clôture fiscale certifiée',
    shiftsStaffActive: 'collaborateurs en service',
    runZReportBtn: 'Clôturer la Caisse & Générer le Rapport Z',
    rosterTitle: 'Brigade Enregistrée sur le Service en Cours',
    lunchShiftName: 'Service du Midi (11:00 - 17:00)',
    onDuty: 'En poste',
    roleCashier: 'Responsable Caisse',
    roleHeadChef: 'Chef de Cuisine',
    roleWaiter: 'Chef de Rang / Serveur',
    roleCourier: 'Livreur',
    roleManager: 'Directeur de Salle',
    startedAt: 'Prise de poste:',
    zClosingTitle: 'Rapprochement de Caisse & Rapport Z Journalier',
    zClosingSubtitle: 'Document légal obligatoire rapprochant les espèces physiques des transactions électroniques.',
    zSuccessNotice: 'Rapport Z généré avec succès et scellé dans le grand livre fiscal.',
    cashCountLabel: 'Espèces physiques comptées en caisse:',
    cashierInCharge: 'Caissier responsable:',
    closingTimeLabel: 'Heure de clôture:',
    calculateEcartBtn: "Calculer l'Écart de Caisse",
    zReportNumber: 'N° Rapport Z:',
    grossSalesText: 'Ventes Brutes Réalisées:',
    taxCollectedText: 'TVA Totale Collectée (7% & 19%):',
    cardPaymentsText: 'Règlements Carte Bancaire TPE:',
    deliveryPaymentsText: 'Règlements Applications Livraison:',
    expectedCashText: 'Espèces Théoriques Attendues:',
    actualCashText: 'Espèces Physiques Saisies:',
    cashDiscrepancy: 'Écart de Caisse:',
    perfectMatch: '0.000 DT (Caisse Parfaite 100%)',
    discrepancyAlert: 'Écart de caisse détecté !',
    printZNotice: 'Imprimer Avis de Clôture Z',

    deliveryTitle: 'Gestion Flotte de Livraison & Agrégateurs',
    deliverySubtitle: 'Dispatch en direct des coursiers et intégration API Glovo / Yassir',
    couriersActiveCount: 'coursiers connectés',
    couriersFleetTitle: 'Flotte Interne de Livreurs',
    statusAvailable: 'Disponible',
    statusOnDelivery: 'En course',
    statusOffline: 'Hors ligne',
    changeStatusBtn: 'Changer statut',
    liveOrdersTitle: 'Flux des Commandes en Livraison en Direct',
    assignCourierBtn: 'Assigner un coursier',
    onTheWay: 'En cours de livraison 🛵',
    driverLabel: 'Coursier:',
    plateLabel: 'Véhicule:',
    todayDeliveries: 'Courses du jour:',

    footerDesc: 'Système ERP Cloud Unifié pour Chaînes de Restauration',
    fiscalCompliance: 'Conformité Fiscale et Fiscale Tunisienne (TVA 7% & 19%)',
    taxIdLabel: 'Matricule Fiscal: 1829471/B/A/M/000',
  },

  en: {
    brandTitle: 'RestoChain OS',
    brandTagline: 'Unified Restaurant Chain Management & Cloud POS',
    currency: 'TND',
    systemSyncActive: 'Cloud Sync Live',
    chainStatus: 'Network: 4 branches connected in real-time • 100% financial accuracy',
    activeShiftNotice: 'Active Shift: Lunch Service (#104)',
    todaySales: "Today's Sales",
    switchBranchPrompt: 'Switch Branch Location (Multi-Site)',
    activeBranchBadge: 'Active Branch',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    loading: 'Loading...',
    actions: 'Actions',
    search: 'Search...',

    navHq: 'HQ Command Center',
    navPos: 'Cloud POS',
    navKds: 'Kitchen KDS',
    navInventory: 'Inventory & Costing',
    navShifts: 'Shifts & Z-Report',
    navDelivery: 'Delivery Fleet',

    hqTitle: 'Unified HQ Command Center',
    hqSubtitle: 'Real-time sales telemetry, operational KPIs, ingredient inventory levels, and food cost margin ratios across all chain locations.',
    hqBadge: 'Enterprise Restaurant Chain Operating System',
    hqOpenPos: 'Open Cloud POS Terminal',
    hqLiveKds: 'Live Kitchen Display (KDS)',
    hqInventoryBtn: 'Inventory & Food Cost',
    kpiTotalRevenue: "Chain Today's Gross Revenue",
    kpiComparedLastWeek: 'vs previous week',
    kpiActiveOrders: 'Active Kitchen Orders',
    kpiAvgCookTime: 'Avg Cook Time: 12.4 min',
    kpiTableOccupancy: 'Table Occupancy Rate',
    kpiOccupiedCount: 'tables occupied',
    kpiFoodCostAvg: 'Chain Average Food Cost',
    kpiTargetRange: 'Within target benchmark range (25-32%)',
    branchPerformanceTitle: 'Live Multi-Branch Network Telemetry',
    branchPerformanceSubtitle: 'Click any branch card to instantly switch and manage local operations.',
    branchConnectedCount: '4 branches synchronized',
    branchSalesToday: "Today's sales:",
    branchActiveOrders: 'Active orders:',
    branchTables: 'Tables:',
    branchManager: 'General Manager:',
    posCardTitle: 'Cloud POS Terminal',
    posCardDesc: 'Instant order taking, visual floor plan, variants & addons, tax calculation and 80mm thermal receipt printing.',
    kdsCardTitle: 'Live Kitchen Display System',
    kdsCardDesc: 'Real-time ticket routing to cook line, color-coded delay timers, item checklist and one-click status transitions.',
    shiftsCardTitle: 'Staff Shifts & Fiscal Z-Report',
    shiftsCardDesc: 'Drawer cash reconciliation, cashier variance discrepancy detection, and end-of-day official Z closing.',

    posTitle: 'Cloud POS Terminal',
    posSubtitle: 'Connected station with instant kitchen and inventory telemetry',
    posStationBadge: 'Station #01 - Online',
    dineIn: 'Dine In',
    takeaway: 'Takeaway',
    delivery: 'Delivery',
    floorPlanTitle: 'Select an Active Table (Floor Plan):',
    tableAvailable: 'Available',
    tableOccupied: 'Occupied',
    tableBillRequested: 'Bill Requested',
    tableReserved: 'Reserved',
    tableLabel: 'Table',
    seatsLabel: 'seats',
    allCategories: 'All Categories',
    searchMenuPlaceholder: 'Search dishes...',
    multipleSizesBadge: 'Multiple Sizes',
    currentOrderTitle: 'Current Ticket',
    tableTag: 'Table',
    itemsInCart: 'items in ticket',
    emptyCartTitle: 'Ticket is currently empty',
    emptyCartDesc: 'Click on any dish from the menu catalog to build an order',
    clearCartBtn: 'Clear',
    perItem: 'TND each',
    kitchenNotesLabel: 'Special Kitchen Directives (Chef Instructions):',
    kitchenNotesPlaceholder: 'E.g., medium rare steak, no pickles, extra dressing on the side...',
    promoCodePlaceholder: 'Promo coupon (RESTO10)',
    applyPromoBtn: 'Apply',
    subtotalHt: 'Subtotal Net (Excl. Tax):',
    vatLabel: 'Hospitality VAT (7%):',
    discountApplied: 'Promotion Discount:',
    totalNet: 'Total Due (Incl. Tax):',
    payAndPrintBtn: 'Pay & Print Receipt',
    sendKdsOnlyBtn: 'Send to Kitchen (KDS Only)',
    customizeTitle: 'Dish Customization',
    chooseSize: 'Choose size / portion:',
    optionalAddons: 'Optional supplements & addons:',
    chefNoteLabel: 'Note for the line cook:',
    chefNotePlaceholder: 'E.g., no mayo, gluten-free prep...',
    addToOrderBtn: 'Add to Ticket',
    paymentModalTitle: 'Payment & Receipt Generation',
    amountDue: 'Amount Due:',
    paymentMethod: 'Payment method:',
    payCash: 'Cash',
    payCard: 'Card / POS Terminal',
    payDeliveryApp: 'Glovo / Yassir',
    cashReceived: 'Cash received from customer:',
    changeDue: 'Change to return:',

    receiptFiscalTitle: 'Fiscal Certified Electronic Receipt',
    receiptTicketNo: 'Ticket #:',
    receiptDateTime: 'Date & Time:',
    receiptType: 'Type:',
    receiptServer: 'Server / Cashier:',
    receiptItem: 'Item',
    receiptQty: 'Qty',
    receiptTotal: 'Total',
    receiptGrossHt: 'Subtotal (Excl. Tax):',
    receiptVat: 'VAT (7%):',
    receiptNetTotal: 'Total Amount (Incl. Tax):',
    receiptPayMethod: 'Payment:',
    receiptFiscalNotice: 'Certified fiscal receipt registered in Central Digital Ledger',
    receiptThankYou: 'Thank you for your visit • See you soon',
    receiptPrintBtn: 'Print Thermal Receipt (80mm)',

    kdsTitle: 'Kitchen Display System (KDS)',
    kdsSubtitle: 'Live cook line tickets with station routing and elapsed timers',
    kdsLiveBadge: 'Live Streaming',
    kdsActiveTicketsCount: 'active tickets',
    stationAll: 'All Stations',
    stationGrill: 'Grill Station',
    stationPizza: 'Wood Oven Pizza',
    stationCold: 'Cold & Salad Station',
    stationBar: 'Bar & Mocktails',
    colNew: 'New Tickets',
    colPreparing: 'On the Line (Cooking)',
    colReady: 'Ready for Runner (Pass)',
    noNewOrders: 'No new tickets in queue',
    noPrepOrders: 'No dishes currently on the line',
    noReadyOrders: 'No dishes waiting for pickup',
    timerNormal: 'min (normal)',
    timerWarning: 'min (warning)',
    timerCritical: 'min (critical delay)',
    startCookingBtn: 'Start Cooking Now',
    markReadyBtn: 'Mark as Ready',
    servedBtn: 'Mark as Served',
    waitingRunner: 'Waiting for server pickup',
    itemsCountText: 'Item count:',
    responsibleServer: 'Assigned server:',

    invTitle: 'Central Inventory & Recipe Costing',
    invSubtitle: 'Real-time ingredient tracking and gross profit margin telemetry',
    invActiveWarehouse: 'Active warehouse:',
    invRegisteredCount: 'raw ingredients',
    tabStock: 'Raw Ingredients Stock',
    tabRecipes: 'Recipe Food Cost %',
    tabTransfer: 'Inter-Branch Transfer',
    invTableTitle: 'Raw materials inventory & reorder threshold levels',
    invCriticalNotice: 'items nearing depletion',
    thIngredient: 'Raw Material',
    thUnit: 'Unit',
    thCurrentStock: 'Current Stock',
    thMinThreshold: 'Reorder Level',
    thUnitCost: 'Unit Cost',
    thStatus: 'Status',
    thQuickAdjust: 'Quick Adjust',
    statusCritical: 'Critical Stock',
    statusGood: 'Optimal',
    recipesHeaderTitle: 'Recipe Costing & Profit Margin Breakdown',
    recipesHeaderSubtitle: 'The international target standard for premium dining is 25% to 32% food cost to guarantee healthy margins.',
    sellingPrice: 'Customer Selling Price:',
    rawIngredientCost: 'Ingredient Cost:',
    grossMargin: 'Gross Profit Margin:',
    costLabel: 'Food Cost:',
    transferTitle: 'Inter-Branch Stock Requisition',
    transferSubtitle: 'Rebalance logistics inventory to prevent stockouts in high-demand branches.',
    sourceBranch: 'Origin Branch (Depot):',
    destinationBranch: 'Destination Branch:',
    transferItemSelect: 'Material to transfer:',
    transferQty: 'Quantity to dispatch:',
    executeTransferBtn: 'Authorize Dispatch & Sync Stock',
    transferSuccessNotice: 'Stock transferred successfully! Central inventory balances updated.',

    shiftsTitle: 'Staff Shifts & Fiscal Z-Report',
    shiftsSubtitle: 'Daily cash reconciliation and compliant fiscal closing',
    shiftsStaffActive: 'active staff on duty',
    runZReportBtn: 'Reconcile Drawer & Generate Z-Report',
    rosterTitle: 'Staff Roster Assigned to Active Shift',
    lunchShiftName: 'Lunch Service (11:00 - 17:00)',
    onDuty: 'On Duty',
    roleCashier: 'Cashier In-Charge',
    roleHeadChef: 'Executive Head Chef',
    roleWaiter: 'Dining Room Server',
    roleCourier: 'Fleet Driver',
    roleManager: 'General Floor Manager',
    startedAt: 'Clocked in:',
    zClosingTitle: 'Cash Drawer Reconciliation & Daily Z-Report Closing',
    zClosingSubtitle: 'Mandatory daily financial closing report balancing physical cash with digital ledger transactions.',
    zSuccessNotice: 'Z-Report generated and permanently sealed in financial ledger.',
    cashCountLabel: 'Physical cash counted in drawer:',
    cashierInCharge: 'Closing cashier:',
    closingTimeLabel: 'Closing timestamp:',
    calculateEcartBtn: 'Verify Drawer & Calculate Variance',
    zReportNumber: 'Z-Report Serial #:',
    grossSalesText: 'Gross Sales Revenue:',
    taxCollectedText: 'Total VAT Collected (7% & 19%):',
    cardPaymentsText: 'Card Terminal Payments (TPE):',
    deliveryPaymentsText: 'Delivery Aggregator Payments:',
    expectedCashText: 'Theoretical Cash Expected in Drawer:',
    actualCashText: 'Physical Cash Counted:',
    cashDiscrepancy: 'Drawer Discrepancy (Variance):',
    perfectMatch: '0.000 TND (100% Perfect Match)',
    discrepancyAlert: 'Cash discrepancy detected!',
    printZNotice: 'Print Fiscal Z Notice',

    deliveryTitle: 'Delivery Fleet & Aggregator Dispatch',
    deliverySubtitle: 'Real-time courier dispatch and Glovo / Yassir API synchronization',
    couriersActiveCount: 'couriers online',
    couriersFleetTitle: 'Internal Delivery Fleet Drivers',
    statusAvailable: 'Available',
    statusOnDelivery: 'On Delivery',
    statusOffline: 'Offline',
    changeStatusBtn: 'Toggle Status',
    liveOrdersTitle: 'Live Outbound Delivery Stream',
    assignCourierBtn: 'Assign Courier',
    onTheWay: 'Out for delivery 🛵',
    driverLabel: 'Courier:',
    plateLabel: 'Vehicle:',
    todayDeliveries: 'Trips today:',

    footerDesc: 'Unified Cloud Restaurant Chain Enterprise Operating System',
    fiscalCompliance: 'Tunisian Fiscal Compliance (VAT 7% & 19%)',
    taxIdLabel: 'Tax Registration: 1829471/B/A/M/000',
  },
};
