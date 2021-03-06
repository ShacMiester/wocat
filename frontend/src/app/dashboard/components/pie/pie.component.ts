import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChartMathodsService } from '../services/chartCommonMethods/chart-mathods.service';
import * as Highcharts from 'highcharts';
import { ParentChart } from '../parent-chart';
import { Bucket } from 'src/app/filters/services/interfaces';
import * as fromStore from '../../../../store';
import { Store } from '@ngrx/store';
import { SelectService } from 'src/app/filters/services/select/select.service';
import { BodyBuilderService } from 'src/app/filters/services/bodyBuilder/body-builder.service';
import { ComponentFilterConfigs } from 'src/configs/generalConfig.interface';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
  providers: [ChartMathodsService, SelectService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieComponent extends ParentChart implements OnInit {
  constructor(
    cms: ChartMathodsService,
    private readonly cdr: ChangeDetectorRef,
    public readonly selectService: SelectService,
    public readonly store: Store<fromStore.AppState>,
    private readonly bodyBuilderService: BodyBuilderService
  ) {
    super(cms, selectService, store);
  }
  filterd = false;
  resetFilter(value: boolean = false) {
    this.resetQ()
  }
  ngOnInit(): void {
    this.init('pie');
    const { source } = this.componentConfigs as ComponentFilterConfigs;
    this.buildOptions.subscribe((buckets: Array<Bucket>) => {
      let filters = this.bodyBuilderService.getFiltersFromQuery().filter(element => Object.keys(element).indexOf(source + '.keyword') != -1)
      if (filters.length)
        this.filterd = true;
      else
        this.filterd = false;
      if (buckets) {
        this.chartOptions = this.setOptions(buckets);
      }
      this.cdr.detectChanges();
    });
  }
  mapData(b) {
    let colors = {
      "Cropland": "#f5d700",
      "Waterways, waterbodies, wetlands": "#5b99d6",
      "Grazing land": "#8f7b62",
      "Settlements, infrastructure": "#869da3",
      "Forest/ woodlands": "#1e6930",
      "Unproductive land": "#b2c5c1",
      "Mixed (crops/ grazing/ trees), incl. agroforestry": "#99c003",
    }

    return ({ name: b.key.substr(0, 50), y: b.doc_count, color: colors[b.key] ? colors[b.key] : null })
  }

  private setOptions(buckets: Array<Bucket>): Highcharts.Options {
    return {
      chart: {
        type: 'pie',
        animation: false,
      },
      boost: {
        enabled: false,
        useGPUTranslations: false,
      },
      plotOptions: {
        series: {
          point: {
            events: {
              click: this.setQ(),
            }
          }
        },
        pie: {
          cursor: 'pointer',
          showInLegend: true,
          tooltip: {
            pointFormat: ' <b>{point.y}</b>',
            headerFormat: '{point.key}:',
          },
          dataLabels: {
            enabled: false,
          },
        },
      },
      series: [
        {
          animation: true,
          type: 'pie',
          data: buckets.map((b: Bucket) => this.mapData(b)),
        },
      ],
      ...this.cms.commonProperties(),
    };
  }
}
