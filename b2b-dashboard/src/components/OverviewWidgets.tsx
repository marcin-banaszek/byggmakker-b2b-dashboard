"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { 
  MapPin, 
  Leaf, 
  FileText, 
  Users, 
  Calculator,
  ExternalLink,
  Receipt
} from "lucide-react"
import { Card, CardContent, Progress } from "@kesko/ds-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/translations"

export function OverviewWidgets() {
  const { language } = useLanguage()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      
      {/* 1. Project Info */}
      <Card className="flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-solid-primary-base" />
            <h3 className="text-base font-bold text-text-neutral-black">{t("projectInfo", language)}</h3>
          </div>
          
          <div className="space-y-0 text-sm text-text-neutral-base flex-1">
            <div className="flex justify-between border-b border-borders-base-base py-3">
              <span className="text-text-neutral-light">{t("address", language)}</span>
              <span className="font-medium text-text-neutral-black text-right">Gamle Drammensvei 888</span>
            </div>
            <div className="flex justify-between border-b border-borders-base-base py-3">
              <span className="text-text-neutral-light">{t("postalCode", language)}</span>
              <span className="font-medium text-text-neutral-black text-right">8459</span>
            </div>
            <div className="flex justify-between border-b border-borders-base-base py-3">
              <span className="text-text-neutral-light">{t("city", language)}</span>
              <span className="font-medium text-text-neutral-black text-right">Drammen</span>
            </div>
            <div className="flex justify-between border-b border-borders-base-base py-3">
              <span className="text-text-neutral-light">{t("nameContact", language)}</span>
              <span className="font-medium text-text-neutral-black text-right">Torleif Gabrielsen</span>
            </div>
            <div className="flex justify-between border-b border-borders-base-base py-3">
              <span className="text-text-neutral-light">{t("phoneContact", language)}</span>
              <span className="font-medium text-text-neutral-black text-right">81549300</span>
            </div>
            <div className="flex justify-between border-b border-borders-base-base py-3">
              <span className="text-text-neutral-light">{t("emailContact", language)}</span>
              <span className="font-medium text-text-neutral-black text-right">tobben@gfbygg.no</span>
            </div>
            
            <div className="pt-4">
              <p className="font-bold text-text-neutral-black mb-2">{t("additionalAddresses", language)}</p>
              <ol className="list-decimal pl-4 space-y-1 text-xs text-text-neutral-base">
                <li>Nye Drammensvei 999, 8899 Drammen</li>
                <li>Gode Gamle Drammensvei 895, 8899 Drammen</li>
                <li>Splitter Nye Drammensvei 123, 8899 Drammen</li>
              </ol>
            </div>
          </div>
          <div className="pt-6 mt-auto">
            <button className="flex items-center gap-1.5 text-sm font-medium text-solid-primary-base hover:text-solid-primary-hover transition-colors">
              <ExternalLink className="w-4 h-4" /> {t("editProjectInfo", language)}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 2. Environmental Profile */}
      <Card className="flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="w-5 h-5 text-solid-primary-base" />
            <h3 className="text-base font-bold text-text-neutral-black">{t("environmentalProfile", language)}</h3>
          </div>
          
          <div className="flex-1">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-text-neutral-light border-b border-borders-base-base">
                  <th className="pb-3 font-normal">{t("lifeCyclePhase", language)}</th>
                  <th className="pb-3 text-right font-normal">{t("realized", language)}</th>
                  <th className="pb-3 text-right font-normal">{t("calculated", language)}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borders-base-base text-text-neutral-base">
                <tr>
                  <td className="py-3 font-bold text-text-neutral-black">{t("totalGwp", language)}</td>
                  <td className="py-3 text-right font-medium text-text-neutral-black">10,888</td>
                  <td className="py-3 text-right font-medium text-text-neutral-black">28,965</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-text-neutral-black">{t("totalA1A3", language)}</td>
                  <td className="py-3 text-right font-medium text-text-neutral-black">9,345</td>
                  <td className="py-3 text-right font-medium text-text-neutral-black">18,945</td>
                </tr>
                <tr>
                  <td className="py-3">A1 <span className="text-text-neutral-light">({t("a1Raw", language)})</span></td>
                  <td className="py-3 text-right">5,555</td>
                  <td className="py-3 text-right">10,555</td>
                </tr>
                <tr>
                  <td className="py-3">A2 <span className="text-text-neutral-light">({t("a2Transport", language)})</span></td>
                  <td className="py-3 text-right">1,895</td>
                  <td className="py-3 text-right">5,333</td>
                </tr>
                <tr>
                  <td className="py-3">A3 <span className="text-text-neutral-light">({t("a3Production", language)})</span></td>
                  <td className="py-3 text-right">2,389</td>
                  <td className="py-3 text-right">8,962</td>
                </tr>
                <tr>
                  <td className="py-3">A4 <span className="text-text-neutral-light">({t("a4Transport", language)})</span></td>
                  <td className="py-3 text-right">0.45</td>
                  <td className="py-3 text-right">5.88</td>
                </tr>
                <tr>
                  <td className="py-3">A5 <span className="text-text-neutral-light">({t("a5Installation", language)})</span></td>
                  <td className="py-3 text-right">0.52</td>
                  <td className="py-3 text-right">2.99</td>
                </tr>
                <tr>
                  <td className="py-3">C1 <span className="text-text-neutral-light">({t("c1Demolition", language)})</span></td>
                  <td className="py-3 text-right">0.00</td>
                  <td className="py-3 text-right">0.009</td>
                </tr>
                <tr>
                  <td className="py-3">C2 <span className="text-text-neutral-light">({t("c2Transport", language)})</span></td>
                  <td className="py-3 text-right">8.67</td>
                  <td className="py-3 text-right">12.32</td>
                </tr>
                <tr>
                  <td className="py-3">C3 <span className="text-text-neutral-light">({t("c3Waste", language)})</span></td>
                  <td className="py-3 text-right">10.31</td>
                  <td className="py-3 text-right">22.11</td>
                </tr>
                <tr>
                  <td className="py-3">C4 <span className="text-text-neutral-light">({t("c4Disposal", language)})</span></td>
                  <td className="py-3 text-right">123.88</td>
                  <td className="py-3 text-right">333.88</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pt-6 mt-auto">
            <button className="flex items-center gap-1.5 text-sm font-medium text-solid-primary-base hover:text-solid-primary-hover transition-colors">
              <ExternalLink className="w-4 h-4" /> {t("viewEnvReport", language)}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 3. Order Overview */}
      <Card className="flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-solid-primary-base" />
            <h3 className="text-base font-bold text-text-neutral-black">{t("orderOverview", language)}</h3>
          </div>
          
          <div className="flex-1">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-text-neutral-light border-b border-borders-base-base">
                  <th className="pb-3 font-normal">{t("status", language)}</th>
                  <th className="pb-3 text-right font-normal">{t("numOrders", language)}</th>
                  <th className="pb-3 text-right font-normal">{t("sum", language)}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borders-base-base text-text-neutral-base">
                <tr>
                  <td className="py-4">{t("quoted", language)}</td>
                  <td className="py-4 text-right font-bold text-status-error">123</td>
                  <td className="py-4 text-right">256,005.00 kr</td>
                </tr>
                <tr>
                  <td className="py-4">{t("orderConfirmed", language)}</td>
                  <td className="py-4 text-right font-bold text-status-error">25</td>
                  <td className="py-4 text-right">35,000.00 kr</td>
                </tr>
                <tr>
                  <td className="py-4">{t("orderStarted", language)}</td>
                  <td className="py-4 text-right font-bold text-status-error">456</td>
                  <td className="py-4 text-right">135,000.00 kr</td>
                </tr>
                <tr>
                  <td className="py-4">{t("underReview", language)}</td>
                  <td className="py-4 text-right font-medium text-text-neutral-black">7</td>
                  <td className="py-4 text-right">5,000.00 kr</td>
                </tr>
                <tr>
                  <td className="py-4">{t("delivered", language)}</td>
                  <td className="py-4 text-right font-bold text-status-error">1</td>
                  <td className="py-4 text-right">32.00 kr</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pt-6 mt-auto">
            <button className="flex items-center gap-1.5 text-sm font-medium text-solid-primary-base hover:text-solid-primary-hover transition-colors">
              <ExternalLink className="w-4 h-4" /> {t("viewAllOrders", language)}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 4. Employee Overview */}
      <Card className="flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-5 h-5 text-solid-primary-base" />
            <h3 className="text-base font-bold text-text-neutral-black">{t("employeeOverview", language)}</h3>
          </div>
          
          <div className="flex-1">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-text-neutral-light border-b border-borders-base-base">
                  <th className="pb-3 font-normal">{t("employee", language)}</th>
                  <th className="pb-3 text-right font-normal">{t("withdrawals", language)}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borders-base-base text-text-neutral-base">
                <tr>
                  <td className="py-4">—</td>
                  <td className="py-4 text-right font-medium text-text-neutral-black">568,999.56 kr</td>
                </tr>
                <tr>
                  <td className="py-4">Stein Torleif Bjella</td>
                  <td className="py-4 text-right font-medium text-text-neutral-black">125,999.60 kr</td>
                </tr>
                <tr>
                  <td className="py-4">Hans Rotmo</td>
                  <td className="py-4 text-right font-medium text-text-neutral-black">88,956.00 kr</td>
                </tr>
                <tr>
                  <td className="py-4">Aslak Haugen</td>
                  <td className="py-4 text-right font-medium text-text-neutral-black">50,999.02 kr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 5. Invoice Overview */}
      <Card className="flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Receipt className="w-5 h-5 text-solid-primary-base" />
            <h3 className="text-base font-bold text-text-neutral-black">{t("invoiceOverview", language)}</h3>
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-text-neutral-base">{t("totalOrderValue", language)}</span>
              <span className="font-bold text-text-neutral-black text-lg">849,368.25 kr</span>
            </div>
            
            <div className="flex justify-between items-baseline border-b border-borders-base-base pb-4">
              <span className="text-sm text-text-neutral-base">{t("totalInvoiced", language)}</span>
              <span className="font-bold text-text-neutral-black text-base">650,000.00 kr</span>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-text-neutral-base">{t("invoicedProgress", language)}</span>
                <span className="text-text-neutral-base">76.5%</span>
              </div>
              <Progress value={76.5} indicatorClassName="bg-solid-primary-base" className="h-2" />
              <p className="text-xs text-text-neutral-base mt-2">199,368.25 kr {t("outstanding", language)}</p>
            </div>
          </div>
          
          <div className="pt-6 mt-auto">
            <button className="flex items-center gap-1.5 text-sm font-medium text-solid-primary-base hover:text-solid-primary-hover transition-colors">
              <ExternalLink className="w-4 h-4" /> {t("viewAllInvoices", language)}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* 6. Calculation & Withdrawals */}
      <Card className="flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-5 h-5 text-solid-primary-base" />
            <h3 className="text-base font-bold text-text-neutral-black">{t("calculationWithdrawals", language)}</h3>
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-baseline pb-4 border-b border-borders-base-base">
              <span className="text-sm text-text-neutral-base">{t("totalOrderValue", language)}</span>
              <span className="font-bold text-text-neutral-black text-base">849,368.25 kr</span>
            </div>
            
            <div className="flex justify-between items-baseline pb-4 border-b border-borders-base-base">
              <span className="text-sm text-text-neutral-base">{t("totalCalculatedOrderValue", language)}</span>
              <span className="font-bold text-text-neutral-black text-base">1,649,368.33 kr</span>
            </div>

            <div className="flex justify-between items-baseline pb-4">
              <span className="text-sm text-text-neutral-base">{t("difference", language)}</span>
              <span className="font-bold text-status-error text-base">−800,000.08 kr</span>
            </div>

            <div className="bg-surface-helpers-error p-4 rounded-lg text-sm">
              <p className="font-bold text-status-error mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-status-error flex-shrink-0" />
                {t("budgetShortfall", language)}
              </p>
              <p className="text-xs text-text-neutral-base italic">
                {t("budgetShortfallDesc", language)}
              </p>
            </div>
          </div>
          
          <div className="pt-6 mt-auto">
            <button className="flex items-center gap-1.5 text-sm font-medium text-solid-primary-base hover:text-solid-primary-hover transition-colors">
              <FileText className="w-4 h-4" /> {t("importFromCalcFile", language)}
            </button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
