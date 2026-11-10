'use client';

// =============================================================================
// RestoChain OS - Central Inventory & Recipe Food Cost Management
// Raw ingredients tracking, low stock thresholds, recipe margin analysis & inter-branch transfer
// Tri-Lingual (AR / FR / EN) with dynamic RTL/LTR support
// =============================================================================

import React, { useState } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import {
  IconInventory,
  IconAlertTriangle,
  IconCheckCircle,
  IconPlus,
  IconMinus,
} from '@/components/icons/RestoIcons';

export function InventoryManager() {
  const { state, activeBranch, updateStock } = useRestoStore();
  const { locale, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'STOCK' | 'RECIPES' | 'TRANSFER'>('STOCK');

  // Inter-branch Transfer State
  const [transferIngredientId, setTransferIngredientId] = useState(state.ingredients[0]?.id || '');
  const [transferQuantity, setTransferQuantity] = useState(10);
  const [targetBranchId, setTargetBranchId] = useState(state.branches[1]?.id || '');
  const [transferSuccess, setTransferSuccess] = useState(false);

  const handleStockAdjust = (id: string, delta: number) => {
    const item = state.ingredients.find((i) => i.id === id);
    if (!item) return;
    updateStock(id, Math.max(0, item.currentStock + delta));
  };

  const handleExecuteTransfer = () => {
    const ing = state.ingredients.find(i => i.id === transferIngredientId);
    if (!ing || ing.currentStock < transferQuantity) {
      alert(locale === 'ar' ? 'الكمية المطلوبة للتحويل تتجاوز المخزون المتوفر!' : 'Requested transfer quantity exceeds current warehouse stock!');
      return;
    }

    updateStock(transferIngredientId, ing.currentStock - transferQuantity);
    setTransferSuccess(true);
    setTimeout(() => setTransferSuccess(false), 4000);
  };

  const branchName = locale === 'ar' ? activeBranch?.name : activeBranch?.nameFr || activeBranch?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Inventory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <IconInventory className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 dark:text-white">{t.invTitle}</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {t.invSubtitle}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {t.invActiveWarehouse} <strong className="text-slate-800 dark:text-slate-200">{branchName}</strong> • {t.invRegisteredCount}: <strong className="text-slate-800 dark:text-slate-200">{state.ingredients.length}</strong>
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl gap-1 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('STOCK')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'STOCK'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
            }`}
          >
            {t.tabStock}
          </button>
          <button
            onClick={() => setActiveTab('RECIPES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'RECIPES'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
            }`}
          >
            {t.tabRecipes}
          </button>
          <button
            onClick={() => setActiveTab('TRANSFER')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'TRANSFER'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
            }`}
          >
            {t.tabTransfer}
          </button>
        </div>
      </div>

      {/* TAB 1: RAW INGREDIENTS STOCK TABLE */}
      {activeTab === 'STOCK' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0c121e] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900 dark:text-white">
                {t.invTableTitle}
              </h2>
              <span className="text-xs text-rose-600 font-bold flex items-center gap-1">
                <IconAlertTriangle className="w-3.5 h-3.5" />
                {state.ingredients.filter(i => i.currentStock <= i.minAlertThreshold).length} {t.invCriticalNotice}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                    <th className="p-3.5 text-start font-bold">{t.thIngredient}</th>
                    <th className="p-3.5 text-start font-bold">{t.thUnit}</th>
                    <th className="p-3.5 text-center font-bold">{t.thCurrentStock}</th>
                    <th className="p-3.5 text-center font-bold">{t.thMinThreshold}</th>
                    <th className="p-3.5 text-end font-bold">{t.thUnitCost}</th>
                    <th className="p-3.5 text-center font-bold">{t.thStatus}</th>
                    <th className="p-3.5 text-center font-bold">{t.thQuickAdjust}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {state.ingredients.map((item) => {
                    const isLow = item.currentStock <= item.minAlertThreshold;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="p-3.5 font-mono text-slate-500">
                          {item.unit}
                        </td>
                        <td className="p-3.5 text-center font-mono font-bold text-sm">
                          <span className={isLow ? 'text-rose-600' : 'text-slate-900 dark:text-white'}>
                            {item.currentStock}
                          </span>
                        </td>
                        <td className="p-3.5 text-center font-mono text-slate-500">
                          {item.minAlertThreshold} {item.unit}
                        </td>
                        <td className="p-3.5 text-end font-mono font-bold text-slate-700 dark:text-slate-300">
                          {item.costPerUnit.toFixed(3)} {t.currency}
                        </td>
                        <td className="p-3.5 text-center">
                          {isLow ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                              <IconAlertTriangle className="w-3 h-3" />
                              {t.statusCritical}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              <IconCheckCircle className="w-3 h-3" />
                              {t.statusGood}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-center">
                          <div className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                            <button
                              onClick={() => handleStockAdjust(item.id, -5)}
                              className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                              title="-5"
                            >
                              <IconMinus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleStockAdjust(item.id, 5)}
                              className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                              title="+5"
                            >
                              <IconPlus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RECIPE FOOD COST BREAKDOWN */}
      {activeTab === 'RECIPES' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0c121e] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 space-y-6">
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                {t.recipesHeaderTitle}
              </h2>
              <p className="text-xs text-slate-500">
                {t.recipesHeaderSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {state.recipes.map((rec) => {
                const menuItem = state.menuItems.find((m) => m.id === rec.menuItemId);
                const sellingPrice = menuItem ? menuItem.price : 0;
                const margin = sellingPrice - rec.costPerPortion;
                const isOptimal = rec.foodCostPercentage >= 25 && rec.foodCostPercentage <= 32;

                return (
                  <div
                    key={rec.id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white">
                          {rec.dishName}
                        </h3>
                        <span className="text-[11px] text-slate-400">
                          {rec.ingredients.length} ingredients
                        </span>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-xl text-xs font-mono font-black border ${
                          isOptimal
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {t.costLabel} {rec.foodCostPercentage.toFixed(1)}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isOptimal ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${Math.min(100, rec.foodCostPercentage * 2.5)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">{t.sellingPrice}</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          {sellingPrice.toFixed(3)} {t.currency}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">{t.rawIngredientCost}</span>
                        <span className="font-mono font-bold text-rose-600">
                          {rec.costPerPortion.toFixed(3)} {t.currency}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">{t.grossMargin}</span>
                        <span className="font-mono font-bold text-emerald-600">
                          +{margin.toFixed(3)} {t.currency}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: INTER-BRANCH STOCK TRANSFER */}
      {activeTab === 'TRANSFER' && (
        <div className="max-w-xl mx-auto bg-white dark:bg-[#0c121e] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              {t.transferTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.transferSubtitle}
            </p>
          </div>

          {transferSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
              <IconCheckCircle className="w-4 h-4" />
              <span>{t.transferSuccessNotice}</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.sourceBranch}
              </label>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs text-slate-800 dark:text-slate-200">
                {branchName}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.destinationBranch}
              </label>
              <select
                value={targetBranchId}
                onChange={(e) => setTargetBranchId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold"
              >
                {state.branches
                  .filter((b) => b.id !== state.activeBranchId)
                  .map((b) => (
                    <option key={b.id} value={b.id}>
                      {locale === 'ar' ? b.name : b.nameFr || b.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.transferItemSelect}
              </label>
              <select
                value={transferIngredientId}
                onChange={(e) => setTransferIngredientId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold"
              >
                {state.ingredients.map((ing) => (
                  <option key={ing.id} value={ing.id}>
                    {ing.name} ({ing.currentStock} {ing.unit})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.transferQty}
              </label>
              <input
                type="number"
                value={transferQuantity}
                onChange={(e) => setTransferQuantity(parseInt(e.target.value) || 0)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold"
              />
            </div>

            <button
              onClick={handleExecuteTransfer}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all"
            >
              {t.executeTransferBtn}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
