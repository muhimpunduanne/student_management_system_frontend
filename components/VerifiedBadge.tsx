function VerifiedBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
      ✔ Verified
    </span>
  ) : (
    <span className="inline-block bg-red-200 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
      ✘ Not Verified
    </span>
  );
}
