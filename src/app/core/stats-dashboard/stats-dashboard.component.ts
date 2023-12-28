import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule, NgForOf} from '@angular/common';
import {DynamicMatTableComponent} from '../../tables/dynamic-mat-table/dynamic-mat-table.component';
import {LocalDataService} from '../../services/local-data.service';
import {TableDataService} from '../../services/table-data.service';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.css'],
  standalone: true, // Mark the component as standalone
  imports: [
    MatButtonModule,
    NgForOf,
    CommonModule,
    DynamicMatTableComponent,
    TranslateModule,
  ], // Import Angular Material button module here
})
export class StatsDashboardComponent implements OnInit {
  statGroups = [
    'pvp',
    'pve',
    'gambling',
    'looted',
    'building',
    'item_placed',
    'recycled',
    'gathered',
    'food_gathered',
    'bought',
    'boom',
    'bullets_fired',
    'bullets_hit',
  ];

  selectedGroup = 'pvp';

  columns: Record<string, string[]> = {
    pvp: ['name', 'avatar', 'kills', 'deaths', 'kdr', 'playtime'],
    pve: [
      'name',
      'avatar',
      'killed_bear',
      'killed_boar',
      'killed_bradley',
      'killed_chicken',
      'killed_deer',
      'killed_patrolheli',
      'killed_polarbear',
      'killed_scientist',
      'killed_shark',
      'killed_tunneldweller',
      'killed_underwaterdweller',
      'killed_wolf',
    ],
    gambling: [
      'name',
      'avatar',
      'gambling_blackjackdeposited',
      'gambling_blackjackwon',
      'gambling_pokerdeposited',
      'gambling_pokerwon',
      'gambling_slotdeposited',
      'gambling_slotwon',
      'gambling_wheeldeposited',
      'gambling_wheelwon',
    ],
    looted: [
      'name',
      'avatar',
      'looted_barrel',
      'looted_bradleycrate',
      'looted_crate',
      'looted_elitecrate',
      'looted_hackablecrate',
      'looted_helicrate',
      'looted_oilbarrel',
      'looted_supplydrop',
    ],
    building: [
      'name',
      'avatar',
      'build_wall',
      'build_floor.frame',
      'build_floor.triangle',
      'build_floor.triangle.frame',
      'build_foundation',
      'build_foundation.steps',
      'build_foundation.triangle',
      'build_ramp',
      'build_roof.triangle',
      'build_roof',
      'build_stairs.l',
      'build_stairs.spiral.triangle',
      'build_stairs.spiral',
      'build_stairs.u',
      'build_wall.doorway',
      'build_wall.frame',
      'build_wall.half',
      'build_wall.low',
      'build_wall.window',
    ],
    item_placed: [
      'name',
      'avatar',
      'build_sleepingbag_leather_deployed',
      'build_bed_deployed',
      'build_locker.deployed',
      'build_guntrap.deployed',
      'build_cupboard.tool.deployed',
      'build_vendingmachine.deployed',
      'build_woodbox_deployed',
      'build_flameturret.deployed',
      'build_sam_site_turret_deployed',
      'build_furnace',
      'build_furnace.large',
      'build_wall.external.high.ice',
      'build_wall.external.high.stone',
      'build_wall.external.high.wood',
      'build_gates.external.high.stone',
      'build_gates.external.high.wood',
      'build_box.wooden.large',
    ],
    recycled: [
      'name',
      'avatar',
      'recycled_semibody',
      'recycled_techparts',
      'recycled_smgbody',
      'recycled_metalblade',
      'recycled_fuse',
      'recycled_sheetmetal',
      'recycled_rope',
      'recycled_tarp',
      'recycled_sewingkit',
      'recycled_roadsigns',
      'recycled_metalspring',
      'recycled_riflebody',
      'recycled_metalpipe',
      'recycled_gears',
      'recycled_propanetank',
    ],
    gathered: [
      'name',
      'avatar',
      'gathered_sulfur.ore',
      'gathered_stones',
      'gathered_wood',
      'gathered_hq.metal.ore',
      'gathered_cloth',
      'gathered_leather',
      'gathered_cactusflesh',
      'gathered_fat.animal',
      'gathered_metal.ore',
    ],
    food_gathered: [
      'name',
      'avatar',
      'gathered_bearmeat',
      'gathered_deermeat.raw',
      'gathered_meat.boar',
      'gathered_horsemeat.raw',
      'gathered_humanmeat.raw',
      'gathered_chicken.raw',
      'gathered_wolfmeat.raw',
    ],
    bought: [
      'name',
      'avatar',
      'bought_minicopter.entity',
      'bought_rowboat',
      'bought_rhib',
      'bought_submarinesolo.entity',
      'bought_submarineduo.entity',
      'bought_scraptransporthelicopter',
    ],
    boom: [
      'name',
      'avatar',
      'shot_ammo.rocket.basic',
      'shot_ammo.rocket.hv',
      'shot_ammo.rocket.fire',
      'thrown_explosive.timed',
      'shot_ammo.grenadelauncher.he',
      'shot_ammo.grenadelauncher.smoke',
      'shot_ammo.rifle.explosive',
      'thrown_grenade.beancan',
      'thrown_grenade.f1',
      'thrown_grenade.flashbang',
      'thrown_grenade.molotov',
      'thrown_explosive.satchel',
      'thrown_grenade.smoke',
    ],
    bullets_fired: [
      'name',
      'avatar',
      'shot_ammo.rifle',
      'shot_ammo.snowballgun',
      'shot_ammo.shotgun',
      'shot_ammo.shotgun.fire',
      'shot_ammo.shotgun.slug',
      'shot_ammo.grenadelauncher.buckshot',
      'shot_ammo.handmade.shell',
      'shot_ammo.rifle.hv',
      'shot_ammo.pistol.hv',
      'shot_ammo.rifle.incendiary',
      'shot_ammo.pistol.fire',
      'shot_ammo.nailgun.nails',
      'shot_ammo.pistol',
    ],
    bullets_hit: [
      'name',
      'avatar',
      'hit_player_headshot',
      'hit_player',
      'hit_npc_headshot',
      'hit_building',
      'hit_npc',
    ],
  };

  data: any;

  constructor(
    private localDataService: LocalDataService,
    private tableDataService: TableDataService,
  ) {
  }

  fetchData(group: string) {
    this.selectedGroup = group;
    this.localDataService.fetchData(group).subscribe({
      next: (jsonData) => {
        jsonData = jsonData.map((data) => {
          data.name = data.user.name;
          data.avatar = data.user.avatar;
          return data;
        });
        this.tableDataService.updateTableData(jsonData);
      },
      error: (error) => {
        console.error('Error loading the data', error);
      },
    });
  }

  ngOnInit(): void {
    this.fetchData(this.selectedGroup);
  }
}
