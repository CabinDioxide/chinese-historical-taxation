#!/usr/bin/env python3
"""
Comparative Tax Burden Visualization
Generates charts comparing taxation levels across Chinese dynasties and contemporary civilizations.
"""

import json
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from pathlib import Path
import seaborn as sns

def load_tax_data():
    """Load taxation data from JSON files"""
    data_dir = Path(__file__).parent.parent / "data"
    
    # Load Chinese dynasty data
    china_data = {}
    china_dir = data_dir / "china"
    for file_path in china_dir.glob("*.json"):
        with open(file_path, 'r', encoding='utf-8') as f:
            dynasty_data = json.load(f)
            dynasty_name = dynasty_data['metadata']['dynasty']
            china_data[dynasty_name] = dynasty_data
    
    # Load comparative civilization data
    comparative_data = {}
    comp_dir = data_dir / "comparative"
    for file_path in comp_dir.glob("*.json"):
        with open(file_path, 'r', encoding='utf-8') as f:
            civ_data = json.load(f)
            civ_name = civ_data['metadata']['civilization']
            comparative_data[civ_name] = civ_data
    
    return china_data, comparative_data

def extract_tax_burden_estimates(data):
    """Extract tax burden estimates as GDP percentages"""
    estimates = {}
    
    for name, dataset in data.items():
        if 'total_tax_burden' in dataset:
            burden_data = dataset['total_tax_burden']
            if 'estimates' in burden_data:
                # Get the first estimate or average if multiple
                estimate_list = burden_data['estimates']
                if estimate_list:
                    estimate_str = estimate_list[0]['estimate']
                    # Extract numeric range (e.g., "7-10% of GDP" -> 8.5)
                    if '-' in estimate_str and '%' in estimate_str:
                        range_str = estimate_str.split('%')[0]
                        if '-' in range_str:
                            low, high = map(float, range_str.split('-'))
                            estimates[name] = (low + high) / 2
                        else:
                            estimates[name] = float(range_str)
        elif 'total_fiscal_burden' in dataset:  # For comparative data
            burden_data = dataset['total_fiscal_burden']
            if 'estimates' in burden_data:
                estimate_list = burden_data['estimates']
                if estimate_list:
                    estimate_str = estimate_list[0]['estimate']
                    if '-' in estimate_str and '%' in estimate_str:
                        range_str = estimate_str.split('%')[0]
                        if '-' in range_str:
                            low, high = map(float, range_str.split('-'))
                            estimates[name] = (low + high) / 2
                        else:
                            estimates[name] = float(range_str)
    
    return estimates

def create_comparison_chart(china_estimates, comparative_estimates):
    """Create bar chart comparing tax burdens"""
    plt.style.use('seaborn-v0_8')
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # Combine data
    all_estimates = {**china_estimates, **comparative_estimates}
    
    # Separate Chinese and comparative civilizations
    china_names = list(china_estimates.keys())
    comp_names = list(comparative_estimates.keys())
    
    china_values = [china_estimates[name] for name in china_names]
    comp_values = [comparative_estimates[name] for name in comp_names]
    
    # Create positions for bars
    x_china = np.arange(len(china_names))
    x_comp = np.arange(len(china_names), len(china_names) + len(comp_names))
    
    # Create bars
    bars_china = ax.bar(x_china, china_values, label='Chinese Dynasties', 
                       color='#E74C3C', alpha=0.8)
    bars_comp = ax.bar(x_comp, comp_values, label='Comparative Civilizations', 
                      color='#3498DB', alpha=0.8)
    
    # Customize chart
    ax.set_ylabel('Tax Burden (% of GDP)', fontsize=12)
    ax.set_title('Comparative Tax Burden: China vs Contemporary Civilizations', 
                fontsize=14, fontweight='bold')
    ax.set_xticks(np.concatenate([x_china, x_comp]))
    ax.set_xticklabels(china_names + comp_names, rotation=45, ha='right')
    ax.legend()
    ax.grid(axis='y', alpha=0.3)
    
    # Add value labels on bars
    for bar in bars_china + bars_comp:
        height = bar.get_height()
        ax.annotate(f'{height:.1f}%',
                   xy=(bar.get_x() + bar.get_width() / 2, height),
                   xytext=(0, 3),
                   textcoords="offset points",
                   ha='center', va='bottom',
                   fontsize=10)
    
    plt.tight_layout()
    return fig

def create_timeline_comparison():
    """Create timeline showing tax burden evolution"""
    # Sample data for demonstration
    timeline_data = {
        'Han Dynasty': {'period': (206, 220), 'burden': 8.5},
        'Roman Empire': {'period': (-27, 476), 'burden': 9.0},
        'Tang Dynasty': {'period': (618, 907), 'burden': 7.5},
        'Byzantine Empire': {'period': (330, 1453), 'burden': 8.0},
    }
    
    fig, ax = plt.subplots(figsize=(14, 8))
    
    china_civs = ['Han Dynasty', 'Tang Dynasty']
    other_civs = ['Roman Empire', 'Byzantine Empire']
    
    for i, (name, data) in enumerate(timeline_data.items()):
        start_year, end_year = data['period']
        burden = data['burden']
        
        color = '#E74C3C' if name in china_civs else '#3498DB'
        y_pos = burden
        
        # Draw timeline bar
        ax.barh(i, end_year - start_year, left=start_year, height=0.6, 
               color=color, alpha=0.7, label=name)
        
        # Add civilization name
        ax.text(start_year + (end_year - start_year)/2, i, 
               f'{name}\n{burden}% GDP', 
               ha='center', va='center', fontweight='bold', fontsize=9)
    
    ax.set_xlabel('Year (CE)', fontsize=12)
    ax.set_ylabel('Civilizations', fontsize=12)
    ax.set_title('Historical Timeline: Tax Burden Comparison', fontsize=14, fontweight='bold')
    ax.set_yticks(range(len(timeline_data)))
    ax.set_yticklabels(timeline_data.keys())
    ax.grid(axis='x', alpha=0.3)
    
    # Add vertical line for common reference
    ax.axvline(x=0, color='black', linestyle='--', alpha=0.5)
    ax.text(0, len(timeline_data), ' 1 CE', rotation=90, va='bottom')
    
    plt.tight_layout()
    return fig

def main():
    """Generate all visualization charts"""
    print("Loading taxation data...")
    china_data, comparative_data = load_tax_data()
    
    print("Extracting tax burden estimates...")
    china_estimates = extract_tax_burden_estimates(china_data)
    comp_estimates = extract_tax_burden_estimates(comparative_data)
    
    print("Creating comparison charts...")
    
    # Create output directory
    output_dir = Path(__file__).parent / "output"
    output_dir.mkdir(exist_ok=True)
    
    # Generate comparison chart
    if china_estimates or comp_estimates:
        fig1 = create_comparison_chart(china_estimates, comp_estimates)
        fig1.savefig(output_dir / "tax_burden_comparison.png", dpi=300, bbox_inches='tight')
        print(f"Saved: {output_dir / 'tax_burden_comparison.png'}")
    
    # Generate timeline chart
    fig2 = create_timeline_comparison()
    fig2.savefig(output_dir / "tax_burden_timeline.png", dpi=300, bbox_inches='tight')
    print(f"Saved: {output_dir / 'tax_burden_timeline.png'}")
    
    plt.show()

if __name__ == "__main__":
    main()