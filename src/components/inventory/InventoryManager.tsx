'use client';

// =============================================================================
// RestoChain OS — Minimalist Luxury Inventory & Recipe Costing
// Clean table, calm monochromatic layout, quiet data telemetry
// =============================================================================

import React, { useState } from 'react';
import { useRestoStore } from '@/lib/store/restochain-store';
import { useLanguage } from '@/lib/context/LanguageContext';
import { soundFx } from '@/lib/utils/audio';
import {
  IconPlus,
  IconMinus,
} from '@/components/icons/RestoIcons';

export function InventoryManager() {
  const { state, activeBranch, updateStock } = useRestoStore();
  const { locale, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'STOCK' | 'RECIPES' | 'TRANSFER'>('STOCK');

  const [transferIngredientId, setTransferIngredientId] = useState(state.ingredients[0]?.id || '');
  const [transferQuantity, setTransferQuantity] = useState(10);
  const [targetBranchId, setTargetBranchId] = useState(state.branches[1]?.id || '');
  const [transferSuccess, setTransferSuccess] = useState(false);

  const handleStockAdjust = (id: string, delta: number) => {
    soundFx.playClick();
    const item = state.ingredients.find((i) => i.id === id);
    if (!item) return;
    updateStock(id, Math.max(0, item.currentStock + delta));
  };

  const handleExecuteTransfer = () => {
    soundFx.playClick();
    const ing = state.ingredients.find(i => i.id === transferIngredientId);
    if (!ing || ing.currentStock < transferQuantity) {
      alert(locale === 'ar' ? 'الكمية المطلوبة تتجاوز المخزون المتوفر!' : 'Requested quantity exceeds stock!');
      return;
    }

    updateStock(transferIngredientId, ing.currentStock - transferQuantity);
    setTransferSuccess(true);
    setTimeout(() => setTransferSuccess(false), 3000);
  };

  const branchName = locale === 'ar' ? activeBranch?.name : activeBranch?.nameFr || activeBranch?.name;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {t.invTitle}
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            {branchName} • {state.ingredients.length} {t.invRegisteredCount}
          </p>
        </div>

        {/* Quiet Tabs */}
        <div className="flex items-center gap-1 bg-neutral-200/50 dark:bg-white/5 p-1 rounded-xl">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('STOCK');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'STOCK'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            {t.tabStock}
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('RECIPES');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'RECIPES'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            {t.tabRecipes}
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('TRANSFER');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'TRANSFER'
                ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
            }`}
          >
            {t.tabTransfer}
          </button>
        </div>
      </div>

      {/* TAB 1: STOCK TABLE */}
      {activeTab === 'STOCK' && (
        <div className="quiet-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr className="border-b border-neutral-100 dark:border-white/5 text-neutral-400 font-medium">
                  <th className="p-4 text-start">{t.thIngredient}</th>
                  <th className="p-4 text-start">{t.thUnit}</th>
                  <th className="p-4 text-center">{t.thCurrentStock}</th>
                  <th className="p-4 text-center">{t.thMinThreshold}</th>
                  <th className="p-4 text-end">{t.thUnitCost}</th>
                  <th className="p-4 text-center">{t.thStatus}</th>
                  <th className="p-4 text-center">{t.thQuickAdjust}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-white/5 font-mono">
                {state.ingredients.map((item) => {
                  const isLow = item.currentStock <= item.minAlertThreshold;
                  return (
                    <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-white/2 transition-colors">
                      <td className="p-4 font-bold text-neutral-900 dark:text-white font-sans">
                        {item.name}
                      </td>
                      <td className="p-4 text-neutral-400">
                        {item.unit}
                      </td>
                      <td className="p-4 text-center font-bold">
                        <span className={isLow ? 'text-rose-500' : 'text-neutral-900 dark:text-white'}>
                          {item.currentStock}
                        </span>
                      </td>
                      <td className="p-4 text-center text-neutral-400">
                        {item.minAlertThreshold} {item.unit}
                      </td>
                      <td className="p-4 text-end text-neutral-700 dark:text-neutral-300">
                        {item.costPerUnit.toFixed(3)} {t.currency}
                      </td>
                      <td className="p-4 text-center font-sans text-[11px]">
                        <span className="flex items-center justify-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${isLow ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                          <span className={isLow ? 'text-rose-500 font-medium' : 'text-neutral-500'}>
                            {isLow ? t.statusCritical : t.statusGood}
                          </span>
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleStockAdjust(item.id, -5)}
                            className="w-6 h-6 rounded hover:bg-neutral-200/60 dark:hover:bg-white/10 flex items-center justify-center text-neutral-500"
                          >
                            <IconMinus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleStockAdjust(item.id, 5)}
                            className="w-6 h-6 rounded hover:bg-neutral-200/60 dark:hover:bg-white/10 flex items-center justify-center text-neutral-500"
                          >
                            <IconPlus className="w-3 h-3" />
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
      )}

      {/* TAB 2: RECIPE FOOD COST */}
      {activeTab === 'RECIPES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.recipes.map((rec) => {
            const menuItem = state.menuItems.find((m) => m.id === rec.menuItemId);
            const sellingPrice = menuItem ? menuItem.price : 0;
            const margin = sellingPrice - rec.costPerPortion;
            return (
              <div
                key={rec.id}
                className="quiet-card rounded-2xl p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {rec.dishName}
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {rec.ingredients.length} ingredients
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                    {rec.foodCostPercentage.toFixed(1)}% FC
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-100 dark:border-white/5 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-sans">Price</span>
                    <span>{sellingPrice.toFixed(3)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-sans">Cost</span>
                    <span>{rec.costPerPortion.toFixed(3)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 block font-sans">Margin</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{margin.toFixed(3)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: TRANSFER */}
      {activeTab === 'TRANSFER' && (
        <div className="max-w-md mx-auto quiet-card rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
            {t.transferTitle}
          </h2>

          {transferSuccess && (
            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              {t.transferSuccessNotice}
            </div>
          )}

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-neutral-400">{t.sourceBranch}</label>
              <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-white/5 font-medium">
                {branchName}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">{t.destinationBranch}</label>
              <select
                value={targetBranchId}
                onChange={(e) => setTargetBranchId(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-white"
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

            <div className="space-y-1">
              <label className="text-neutral-400">{t.transferItemSelect}</label>
              <select
                value={transferIngredientId}
                onChange={(e) => setTransferIngredientId(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-white"
              >
                {state.ingredients.map((ing) => (
                  <option key={ing.id} value={ing.id}>
                    {ing.name} ({ing.currentStock} {ing.unit})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">{t.transferQty}</label>
              <input
                type="number"
                value={transferQuantity}
                onChange={(e) => setTransferQuantity(parseInt(e.target.value) || 0)}
                className="w-full p-2.5 rounded-lg bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-white font-mono"
              />
            </div>

            <button
              onClick={handleExecuteTransfer}
              className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs transition-transform active:scale-[0.99] mt-2"
            >
              {t.executeTransferBtn}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
