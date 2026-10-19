using GoldPriceApi.Models;

namespace GoldPriceApi.Services;

public sealed class GoldPriceService
{
    private readonly List<GoldPrice> _prices =
    [
        new() { Karat = 24, PricePerGram = 53.840m },
        new() { Karat = 22, PricePerGram = 49.310m },
        new() { Karat = 21, PricePerGram = 47.100m },
        new() { Karat = 18, PricePerGram = 40.380m }
    ];

    public IReadOnlyList<GoldPrice> GetAllPrices() => _prices;

    public GoldPrice? GetPriceByKarat(int karat) =>
        _prices.FirstOrDefault(price => price.Karat == karat);

    public IReadOnlyList<HistoricalGoldPrice> GetHistory()
    {
        var today = DateOnly.FromDateTime(DateTime.Today);
        var history = new List<HistoricalGoldPrice>();

        for (var daysAgo = 29; daysAgo >= 0; daysAgo--)
        {
            var date = today.AddDays(-daysAgo);
            var adjustment = 1 + (decimal)Math.Sin((29 - daysAgo) / 4.5) * 0.025m;
            history.Add(new HistoricalGoldPrice
            {
                Date = date.ToString("yyyy-MM-dd"),
                K18 = decimal.Round(_prices[3].PricePerGram * adjustment, 3),
                K21 = decimal.Round(_prices[2].PricePerGram * adjustment, 3),
                K22 = decimal.Round(_prices[1].PricePerGram * adjustment, 3),
                K24 = decimal.Round(_prices[0].PricePerGram * adjustment, 3)
            });
        }

        return history;
    }
}