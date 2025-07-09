<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;

class SettingsController extends Controller
{
    /**
     * Get the current tax configuration settings.
     */
    public function getTaxSettings()
    {
        // We will store our custom settings in a `settings.php` config file.
        // We use the config() helper to read from it, with default values.
        $settings = [
            'tax_type' => config('settings.tax.type', 'Percentage'), // Default to 'Percentage'
            'tax_value' => config('settings.tax.value', 7.5),     // Default to 7.5
        ];

        return response()->json($settings);
    }

    /**
     * Update and save the tax configuration settings.
     */
    public function saveTaxSettings(Request $request)
    {
        // Authorization check
        if ($request->user()->role !== 'super-admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'tax_type' => 'required|in:Percentage,Flat Rate',
            'tax_value' => 'required|numeric|min:0',
        ]);

        // This is a robust way to update a config file programmatically.
        $path = config_path('settings.php');
        $config = include($path);

        // Update the values
        $config['tax']['type'] = $validated['tax_type'];
        $config['tax']['value'] = $validated['tax_value'];

        // Write the updated array back to the file
        file_put_contents($path, '<?php return ' . var_export($config, true) . ';');

        // Clear the config cache to apply changes immediately
        Artisan::call('config:cache');

        return response()->json(['message' => 'Tax settings saved successfully.']);
    }
}